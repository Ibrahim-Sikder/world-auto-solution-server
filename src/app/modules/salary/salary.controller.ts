import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SalaryServices } from './salary.service';
import httpStatus from 'http-status';
import { Salary } from './salary.model';

const createSalary = catchAsync(async (req, res) => {
  const result = await SalaryServices.createSalaryIntoDB(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Salary details added successful!',
    data: result,
  });
});
const getSalariesForCurrentMonth = catchAsync(async (req, res) => {
  const searchTerm = req.query.searchTerm as string;
  const result = await SalaryServices.getSalariesForCurrentMonth(searchTerm);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Salary retrieves successful!',
    data: result,
  });
});

const getSingleSalary = catchAsync(async (req, res) => {
  const id = req.query.id as string;
  const limit = parseInt(req.query.limit as string);
  const page = parseInt(req.query.page as string);

  const result = await SalaryServices.getSalariesFromDB(id, limit, page);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Salary retrieved successful!',
    data: result,
  });
});
const updateSalaryIntoDB = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await SalaryServices.updateSalaryIntoDB(id, req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Salary update succesfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

const deleteSalaryFromDB = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await SalaryServices.deleteSalaryFromDB(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Salary deleted successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});
export const salaryController = {
  createSalary,
  getSalariesForCurrentMonth,
  getSingleSalary,
  updateSalaryIntoDB,
  deleteSalaryFromDB,
};
