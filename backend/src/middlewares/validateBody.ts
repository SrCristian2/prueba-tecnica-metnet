// middlewares/validateDto.ts
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";

export function validateDto(DtoClass: any) {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const dtoObject = plainToInstance(DtoClass, req.body);
    const errors = await validate(dtoObject);

    if (errors.length > 0) {
      const messages = errors
        .map((err) => Object.values(err.constraints || {}))
        .flat();
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: messages,
      });
      return;
    }

    req.body = dtoObject;
    next();
  };
}
