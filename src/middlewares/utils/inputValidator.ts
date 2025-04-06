import Joi from "joi"
import { Frequency, Validator } from "./enums"
import { ValidatorService } from "../services/validator.service";

export const AlertValidator = (method: Validator) => {
    let validator;
    if (method === Validator.CREATE_ALERT) validator = setAlertValidator.createAlert();
    if (typeof validator === "undefined")
      throw new Error(`"${validator}" validator does not exist`);
  
    return ValidatorService(validator);
  }

const setAlertValidator = {

    createAlert(): Joi.ObjectSchema {
      return Joi.object({
        url: Joi.string().uri().required(),
        desiredPrice: Joi.number().required(),
        email: Joi.string().email().required(),
        frequency: Joi.string().required().valid(Frequency.DAILY, Frequency.MIDNIGHT, Frequency.MORNING),
      })
    },
  }