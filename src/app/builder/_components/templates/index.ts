import { ClassicTemplate } from './ClassicTemplate';
import { ModernTemplate } from './ModernTemplate';
import { MinimalTemplate } from './MinimalTemplate';
import { ExecutiveTemplate } from './ExecutiveTemplate';

export {
  ClassicTemplate,
  ModernTemplate,
  MinimalTemplate,
  ExecutiveTemplate,
};

export const templates = {
  classic: ClassicTemplate,
  modern: ModernTemplate,
  minimal: MinimalTemplate,
  executive: ExecutiveTemplate,
};

export const templateNames = {
  classic: 'Classic',
  modern: 'Modern',
  minimal: 'Minimal',
  executive: 'Executive Professional',
};
