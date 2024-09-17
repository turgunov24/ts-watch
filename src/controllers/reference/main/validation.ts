import Joi from "@hapi/joi";

export const paramsSchema = Joi.object({
  type: Joi.number().required(),
});
