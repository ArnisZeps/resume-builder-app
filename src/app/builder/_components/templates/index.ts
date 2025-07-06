import { ClassicTemplate } from './ClassicTemplate';
import { ModernTemplate } from './ModernTemplate';
import { MinimalTemplate } from './MinimalTemplate';

export {
  ClassicTemplate,
  ModernTemplate,
  MinimalTemplate,
};

export const templates = {
  classic: ClassicTemplate,
  modern: ModernTemplate,
  minimal: MinimalTemplate,
};

export const templateNames = {
  classic: 'Classic',
  modern: 'Modern',
  minimal: 'Minimal',
};
