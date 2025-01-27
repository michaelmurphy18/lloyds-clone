import { z } from "zod";

interface ValidateConfig<T extends z.ZodTypeAny> {
  dto: unknown;
  schema: T;
  schemaName: string;
}

export function validateSchema<T extends z.ZodTypeAny>(
  config: ValidateConfig<T>,
): z.infer<T> {
  const { data, success, error } = config.schema.safeParse(config.dto);

  if (success) {
    return data;
  } else {
    console.log(`API Validation Error: ${config.schemaName}`, {
      data: config.dto,
      error: error.message,
      issues: error.issues,
    });

    throw error;
  }
}
