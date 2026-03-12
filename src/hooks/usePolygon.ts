'use client';

import {
  areEditorDocumentsEqual,
  clampPoint,
  createDefaultEditorDocument,
  createHistoryState,
  DEFAULT_POLYGON,
  EditorDocument,
  insertPoint,
  normalizeEditorDocument,
  Point,
  pushHistory,
  removePointAt,
  replacePresent,
  serializeClipPath,
  updatePointAt,
} from '@/components/polygon-editor/lib';
import { useCallback, useMemo, useState } from 'react';

interface PolygonRuntimeState {
  history: ReturnType<typeof createHistoryState<EditorDocument>>;
  isDragging: boolean;
  activePointIndex: number | null;
  draggingPoints: Point[] | null;
}

export interface UsePolygonReturn {
  document: EditorDocument;
  points: Point[];
  activePointIndex: number | null;
  isDragging: boolean;
  selectPoint: (index: number | null) => void;
  addPoint: (point: Point, insertIndex?: number) => void;
  removePoint: (index: number) => void;
  updatePoint: (index: number, point: Point, options?: { commit?: boolean }) => void;
  startDragging: (index: number) => void;
  stopDragging: () => void;
  clearActivePoint: () => void;
  moveActivePoint: (point: Point) => void;
  resetPolygon: () => void;
  setPoints: (newPoints: Point[]) => void;
  setDocument: (
    updater: EditorDocument | ((document: EditorDocument) => EditorDocument),
    options?: { commit?: boolean }
  ) => void;
  setPreviewSize: (width: number, height: number, options?: { commit?: boolean }) => void;
  setBackgroundImage: (url: string, options?: { commit?: boolean }) => void;
  setGradient: (
    updater:
      | EditorDocument['gradient']
      | ((gradient: EditorDocument['gradient']) => EditorDocument['gradient']),
    options?: { commit?: boolean }
  ) => void;
}

function commitDocument(
  runtime: PolygonRuntimeState,
  nextDocument: EditorDocument,
  options?: { commit?: boolean }
): PolygonRuntimeState {
  const shouldCommit = options?.commit ?? true;
  const normalizedDocument = normalizeEditorDocument(nextDocument);

  if (areEditorDocumentsEqual(runtime.history.present, normalizedDocument)) {
    return runtime;
  }

  return {
    ...runtime,
    history: shouldCommit
      ? pushHistory(runtime.history, normalizedDocument, areEditorDocumentsEqual)
      : replacePresent(runtime.history, normalizedDocument),
  };
}

export function usePolygon(initialDocument?: Partial<EditorDocument>): UsePolygonReturn {
  const [runtime, setRuntime] = useState<PolygonRuntimeState>(() => {
    const baseDocument = createDefaultEditorDocument(initialDocument);

    return {
      history: createHistoryState(baseDocument),
      isDragging: false,
      activePointIndex: null,
      draggingPoints: null,
    };
  });

  const document = runtime.history.present;
  const points = runtime.draggingPoints ?? document.points;

  const setDocument = useCallback(
    (
      updater: EditorDocument | ((document: EditorDocument) => EditorDocument),
      options?: { commit?: boolean }
    ) => {
      setRuntime(prev => {
        const nextDocument =
          typeof updater === 'function'
            ? (updater as (document: EditorDocument) => EditorDocument)(prev.history.present)
            : updater;

        return {
          ...commitDocument(prev, nextDocument, options),
          draggingPoints: null,
        };
      });
    },
    []
  );

  const selectPoint = useCallback((index: number | null) => {
    setRuntime(prev => ({
      ...prev,
      activePointIndex: index,
      isDragging: false,
      draggingPoints: null,
    }));
  }, []);

  const setPoints = useCallback(
    (newPoints: Point[]) => {
      setDocument(current => ({
        ...current,
        points: newPoints,
      }));
    },
    [setDocument]
  );

  const addPoint = useCallback(
    (point: Point, insertIndex?: number) => {
      setDocument(current => ({
        ...current,
        points: insertPoint(current.points, point, insertIndex),
      }));
    },
    [setDocument]
  );

  const removePoint = useCallback((index: number) => {
    setRuntime(prev => ({
      ...commitDocument(
        prev,
        {
          ...prev.history.present,
          points: removePointAt(prev.history.present.points, index),
        },
        { commit: true }
      ),
      activePointIndex: null,
      isDragging: false,
      draggingPoints: null,
    }));
  }, []);

  const updatePoint = useCallback(
    (index: number, point: Point, options?: { commit?: boolean }) => {
      setDocument(
        current => ({
          ...current,
          points: updatePointAt(current.points, index, clampPoint(point)),
        }),
        options
      );
    },
    [setDocument]
  );

  const startDragging = useCallback((index: number) => {
    setRuntime(prev => ({
      ...prev,
      isDragging: true,
      activePointIndex: index,
      draggingPoints: prev.draggingPoints ?? prev.history.present.points,
    }));
  }, []);

  const stopDragging = useCallback(() => {
    setRuntime(prev => {
      if (!prev.isDragging) {
        return prev;
      }

      const nextPoints = prev.draggingPoints;

      if (!nextPoints) {
        return {
          ...prev,
          isDragging: false,
        };
      }

      return {
        ...commitDocument(
          prev,
          {
            ...prev.history.present,
            points: nextPoints,
          },
          { commit: true }
        ),
        isDragging: false,
        draggingPoints: null,
      };
    });
  }, []);

  const clearActivePoint = useCallback(() => {
    setRuntime(prev => ({
      ...prev,
      isDragging: false,
      activePointIndex: null,
      draggingPoints: null,
    }));
  }, []);

  const moveActivePoint = useCallback((point: Point) => {
    setRuntime(prev => {
      if (prev.activePointIndex === null || !prev.isDragging) {
        return prev;
      }

      const sourcePoints = prev.draggingPoints ?? prev.history.present.points;
      const nextPoints = updatePointAt(sourcePoints, prev.activePointIndex, clampPoint(point));

      return {
        ...prev,
        draggingPoints: nextPoints,
      };
    });
  }, []);

  const resetPolygon = useCallback(() => {
    setRuntime(prev => ({
      ...commitDocument(
        prev,
        {
          ...prev.history.present,
          points: DEFAULT_POLYGON,
        },
        { commit: true }
      ),
      isDragging: false,
      activePointIndex: null,
      draggingPoints: null,
    }));
  }, []);

  const setPreviewSize = useCallback(
    (width: number, height: number, options?: { commit?: boolean }) => {
      setDocument(
        current => ({
          ...current,
          previewSize: { width, height },
        }),
        options
      );
    },
    [setDocument]
  );

  const setBackgroundImage = useCallback(
    (url: string, options?: { commit?: boolean }) => {
      setDocument(
        current => ({
          ...current,
          backgroundImage: url,
        }),
        options
      );
    },
    [setDocument]
  );

  const setGradient = useCallback(
    (
      updater:
        | EditorDocument['gradient']
        | ((gradient: EditorDocument['gradient']) => EditorDocument['gradient']),
      options?: { commit?: boolean }
    ) => {
      setDocument(
        current => ({
          ...current,
          gradient:
            typeof updater === 'function'
              ? (updater as (gradient: EditorDocument['gradient']) => EditorDocument['gradient'])(
                  current.gradient
                )
              : updater,
        }),
        options
      );
    },
    [setDocument]
  );

  return useMemo(
    () => ({
      document,
      points,
      activePointIndex: runtime.activePointIndex,
      isDragging: runtime.isDragging,
      selectPoint,
      addPoint,
      removePoint,
      updatePoint,
      startDragging,
      stopDragging,
      clearActivePoint,
      moveActivePoint,
      resetPolygon,
      setPoints,
      setDocument,
      setPreviewSize,
      setBackgroundImage,
      setGradient,
    }),
    [
      document,
      points,
      runtime.activePointIndex,
      runtime.isDragging,
      selectPoint,
      addPoint,
      removePoint,
      updatePoint,
      startDragging,
      stopDragging,
      clearActivePoint,
      moveActivePoint,
      resetPolygon,
      setPoints,
      setDocument,
      setPreviewSize,
      setBackgroundImage,
      setGradient,
    ]
  );
}

export { createDefaultEditorDocument, serializeClipPath };
export type { EditorDocument, Point };
