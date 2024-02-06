import sendMail, { renderTemplate } from '../config/mailer.config';
import { NotFoundError } from '../helpers/error-responses';
import { IPropertyRequest } from '../interfaces/model/property-requests.model';
import PropertyRequest from '../models/property-request.model';

export class PropertyRequestService {
  constructor() {}

  async addOne(body: Omit<IPropertyRequest, '_id'>): Promise<IPropertyRequest> {
    const { request, name, email } = body;

    const propertyRequest = await PropertyRequest.create({
      request,
      name,
      email,
    });

    await sendMail({
      to: email,
      subject: 'Property Request',
      html: renderTemplate('property-request.ejs'),
    });

    return propertyRequest;
  }

  async getOne(_id: string): Promise<IPropertyRequest> {
    const request = await PropertyRequest.findById(_id);

    if (!request) throw new NotFoundError('Request does not exist');

    return request;
  }

  async getAll(): Promise<IPropertyRequest[]> {
    return await PropertyRequest.find<IPropertyRequest[]>({}).populate('createdAt');
  }

  async delete(_id: string) {
    const request = await PropertyRequest.findById(_id);

    if (!request) throw new NotFoundError('Request does not exist');

    await request.deleteOne();
  }
}
