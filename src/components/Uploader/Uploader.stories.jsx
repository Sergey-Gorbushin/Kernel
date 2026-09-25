import React from 'react';
import { DesignSystemSectionPage } from '../shared/DesignSystemSectionPage';
import { FileUploader } from './FileUploader';
import { UploadFile } from './UploadFile';

export default {
  title: 'Design System/Uploader',
  parameters: { layout: 'fullscreen' },
};

export const States = () => (
  <DesignSystemSectionPage title="Uploader">
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 360 }}>
      <UploadFile name="my_filename.pdf" size={4200000} loaded={2500000} status="uploading" />
      <UploadFile name="report.docx" size={1800000} status="success" />
      <UploadFile name="photo.jpg" size={3100000} status="error" errorText="Файл повреждён" />
    </div>
  </DesignSystemSectionPage>
);
States.parameters = { controls: { disable: true } };

export const SingleFile = () => (
  <DesignSystemSectionPage title="Uploader">
    <div style={{ maxWidth: 360 }}>
      <FileUploader accept=".pdf,.doc,.docx" />
    </div>
  </DesignSystemSectionPage>
);
SingleFile.parameters = { controls: { disable: true } };

export const MultipleFiles = () => (
  <DesignSystemSectionPage title="Uploader">
    <div style={{ maxWidth: 360 }}>
      <FileUploader multiple maxFiles={5} accept=".pdf,.doc,.docx,.jpg,.png" />
    </div>
  </DesignSystemSectionPage>
);
MultipleFiles.parameters = { controls: { disable: true } };
