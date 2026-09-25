import React from 'react';
import { Button } from '../Buttons/Button';
import { PlusIcon } from '../shared/icons';
import { UploadFile } from './UploadFile';

let uid = 0;

/**
 * "Добавить файл" button → system file picker → UploadFile rows appear in
 * the button's place; the button moves below them (multiple) or hides once
 * maxFiles is reached. Not a dropzone.
 *
 * @example
 * <FileUploader multiple maxFiles={5} accept=".pdf,.doc,.docx" upload={myUpload} />
 */
export function FileUploader({ multiple = false, maxFiles, accept, buttonLabel = 'Добавить файл', buttonSize = 'default', buttonVariant = 'secondary', upload, onChange, style }) {
  const [files, setFiles] = React.useState([]);
  const inputRef = React.useRef(null);
  const limit = multiple ? (maxFiles ?? Infinity) : 1;

  const patch = (id, p) => setFiles((fs) => fs.map((f) => (f.id === id ? { ...f, ...p } : f)));

  React.useEffect(() => {
    onChange?.(files);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  const start = (entry) => {
    if (!upload) { patch(entry.id, { status: 'success', loaded: entry.size }); return; }
    Promise.resolve(upload(entry.file, (loaded) => patch(entry.id, { loaded })))
      .then(() => patch(entry.id, { status: 'success', loaded: entry.size }))
      .catch((e) => patch(entry.id, { status: 'error', errorText: e?.message || 'Не удалось загрузить файл' }));
  };

  const onPick = (e) => {
    const picked = Array.from(e.target.files || []).slice(0, Math.max(0, limit - files.length));
    e.target.value = '';
    const entries = picked.map((file) => ({ id: ++uid, file, name: file.name, size: file.size, loaded: 0, status: 'uploading' }));
    setFiles((fs) => [...fs, ...entries]);
    entries.forEach(start);
  };

  const remove = (id) => setFiles((fs) => fs.filter((f) => f.id !== id));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 16, width: '100%', ...style }}>
      {files.map((f) => (
        <UploadFile key={f.id} name={f.name} size={f.size} loaded={f.loaded} status={f.status} errorText={f.errorText} onRemove={() => remove(f.id)} />
      ))}
      {files.length < limit && (
        <Button size={buttonSize} variant={buttonVariant} showLeftIcon icon={<PlusIcon size={16} />} onClick={() => inputRef.current?.click()}>
          {buttonLabel}
        </Button>
      )}
      <input ref={inputRef} type="file" accept={accept} multiple={multiple && limit - files.length > 1} onChange={onPick} style={{ display: 'none' }} />
    </div>
  );
}

export default FileUploader;
