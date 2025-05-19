import { ITenant } from './tenant.interface';
import { Tenant } from './tenant.model';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { createSubscription } from '../subscription/subscription.service';

export const createTenant = async (payload: ITenant, plan: 'Monthly' | 'HalfYearly' | 'Yearly') => {
  try {

    
    const { name, domain } = payload;
    const dbUri = `mongodb://localhost:27017/${domain.replace('.', '_')}`;
    const subscription = createSubscription(plan);

    const tenant = new Tenant({
      name,
      domain,
      dbUri,
      subscription,
      isActive: true,
    });

    await tenant.save();
    console.log('✅ Tenant created successfully.');
    return tenant;
  } catch (error: any) {
    throw new AppError(500, error.message || 'Error creating tenant');
  }
};


const getAllTenant = async (query: Record<string, unknown>) => {
  const tenantQuery = new QueryBuilder(Tenant.find(), query)
    .search(['companyName'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await tenantQuery.countTotal();
  const tenants = await tenantQuery.modelQuery;

  return { meta, tenants };
};

const getSingleTenant = async (id: string) => {
  const tenant = await Tenant.findById(id);
  if (!tenant) {
    throw new AppError(httpStatus.NOT_FOUND, 'Tenant not found');
  }
  return tenant;
};

const updateTenant = async (id: string, payload: Partial<ITenant>) => {
  const tenant = await Tenant.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!tenant) {
    throw new AppError(httpStatus.NOT_FOUND, 'Tenant not found');
  }

  return tenant;
};

const deleteTenant = async (id: string) => {
  const result = await Tenant.deleteOne({ _id: id });
  if (result.deletedCount === 0) {
    throw new AppError(httpStatus.NOT_FOUND, 'Tenant not found');
  }
  return { message: 'Tenant deleted successfully' };
};

export const TenantServices = {
  createTenant,
  getAllTenant,
  getSingleTenant,
  updateTenant,
  deleteTenant,
};
