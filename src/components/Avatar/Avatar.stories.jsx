import React from 'react';
import { DesignSystemSectionPage } from '../shared/DesignSystemSectionPage';
import { Avatar, AvatarMark } from './Avatar';

export default {
  title: 'Design System/Avatar',
  parameters: { layout: 'fullscreen' },
};

export const Person = () => (
  <DesignSystemSectionPage title="Avatar">
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 320 }}>
      <Avatar name="Иван Петров" email="ivan.petrov@example.com" caption="ivan.petrov@example.com" />
      <Avatar name="Анна" reliability="high" caption="Высокая надёжность" />
      <Avatar email="only@example.com" reliability="average" caption="Средняя надёжность" />
      <Avatar name="Сергей Орлов" reliability="low" />
      <Avatar name="Мария Кузнецова" reliability="unknown" />
    </div>
  </DesignSystemSectionPage>
);
Person.parameters = { controls: { disable: true } };

export const Company = () => (
  <DesignSystemSectionPage title="Avatar">
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 320 }}>
      <Avatar company="ООО «Ромашка»" name="Иван Петров" caption="ИНН 7701234567" captionUppercase />
      <Avatar company="АО «Вектор»" name="Анна Смирнова" caption={['ИНН 7712345678', 'КПП 770101001']} captionUppercase />
    </div>
  </DesignSystemSectionPage>
);
Company.parameters = { controls: { disable: true } };

export const Sizes = () => (
  <DesignSystemSectionPage title="Avatar">
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      {[24, 36, 48, 64, 96].map((size) => (
        <div key={size} style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
          <AvatarMark name="Иван Петров" reliability="high" size={size} />
          <span style={{ fontSize: 11, color: '#8C8C8C' }}>{size}px</span>
        </div>
      ))}
    </div>
  </DesignSystemSectionPage>
);
Sizes.parameters = { controls: { disable: true } };

export const NoCaption = () => (
  <DesignSystemSectionPage title="Avatar">
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 320 }}>
      <Avatar name="Иван Петров" reliability="high" />
      <Avatar name="Иван Петров" showName={false} reliability="high" />
    </div>
  </DesignSystemSectionPage>
);
NoCaption.parameters = { controls: { disable: true } };
