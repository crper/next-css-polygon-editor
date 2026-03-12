import type { EditorDocument } from './editor-schema';
import { normalizeEditorDocument } from './editor-schema';

const STORAGE_KEY = 'polygon-editor:draft';
const STORAGE_VERSION = 1;

interface StoredDraft {
  version: number;
  document: EditorDocument;
}

export function saveDraft(document: EditorDocument, storage = globalThis.localStorage) {
  const payload: StoredDraft = {
    version: STORAGE_VERSION,
    document: normalizeEditorDocument(document),
  };

  storage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

export function loadDraft(storage = globalThis.localStorage): EditorDocument | null {
  const rawDraft = storage.getItem(STORAGE_KEY);

  if (!rawDraft) {
    return null;
  }

  try {
    const parsed = JSON.parse(rawDraft) as Partial<StoredDraft>;

    if (parsed.version !== STORAGE_VERSION || !parsed.document) {
      return null;
    }

    return normalizeEditorDocument(parsed.document);
  } catch {
    return null;
  }
}

export function clearDraft(storage = globalThis.localStorage) {
  storage.removeItem(STORAGE_KEY);
}
