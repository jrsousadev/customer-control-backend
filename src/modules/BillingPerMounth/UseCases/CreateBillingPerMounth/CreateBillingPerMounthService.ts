import { AppError } from "../../../../shared/errors/AppError";
import { UserModel } from "../../../User/entities/UserModel";
import { BillingPerMounthModel } from "../../entities/BillingPerMounthModel";

interface IRequest {
  mounthName: string;
  billing: string;
  year: string;
  userId: string;
}

class CreateBillingPerMounthService {
  async execute({
    mounthName,
    billing,
    year,
    userId,
  }: IRequest){
    if(!mounthName || !billing || !year || !userId) throw new AppError("Preencha todas as informações")

    const userAlreadyExist = await UserModel.findOne({
      _id: userId
    });

    if(!userAlreadyExist) throw new AppError("Internal server error!");

    const MounthAlteradyExist = await BillingPerMounthModel.findOne({
      userResponsible: userId,
      mounthName: mounthName.toLocaleLowerCase(),
      year
    });

    if(MounthAlteradyExist) throw new AppError('Mês já criado, verifique o ano!');

    const data = {
      userResponsible: userId,
      mounthName: mounthName.toLocaleLowerCase(),
      billing,
      year,
    }

    const mounth = await BillingPerMounthModel.create(data);

    return mounth;
  } 
}

export { CreateBillingPerMounthService }