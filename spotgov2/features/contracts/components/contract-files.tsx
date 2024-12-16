import React from 'react';

interface Document {
  isProgramaDoConcurso: boolean;
  isCadernoDeEncargos: boolean;
  type: string;
  size: number;
  fullPath: string;
  downloadUrl: string;
  name: string;
}

interface ContractFilesProps {
  documents: Document[];
}

export default function ContractFiles({ documents }: ContractFilesProps) {
  return (
    <div>
      <h2>Contract Files</h2>
      {documents.length > 0 ? (
        <ul>
          {documents.map((doc, index) => (
            <li key={index}>
              <a href={doc.downloadUrl} target="_blank" rel="noopener noreferrer">
                {doc.name}
              </a>{' '}
              ({doc.type.toUpperCase()}, {Math.round(doc.size / 1024)} KB)
              {doc.isProgramaDoConcurso && <span> - Programa do Concurso</span>}
              {doc.isCadernoDeEncargos && <span> - Caderno de Encargos</span>}
            </li>
          ))}
        </ul>
      ) : (
        <p>No documents available.</p>
      )}
    </div>
  );
}