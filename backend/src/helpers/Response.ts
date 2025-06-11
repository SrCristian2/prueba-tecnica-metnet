export const Response = <T>(
  res: any,
  statusCode: number,
  ok: boolean,
  data: T,
  message: string
) => {
  res.status(statusCode).json({
    ok,
    data,
    message,
  });
};
