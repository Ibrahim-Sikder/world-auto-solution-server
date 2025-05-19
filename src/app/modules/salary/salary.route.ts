import express from 'express';
import { salaryController } from './salary.controller';

const router = express.Router();

router
  .route('/')
  .post(salaryController.createSalary)
  .get(salaryController.getSalariesForCurrentMonth);

router.route('/all-salary').get(salaryController.getSingleSalary);
router.route('/:id').patch(salaryController.updateSalaryIntoDB);
router.route('/:id').delete(salaryController.updateSalaryIntoDB);

// router.route('/today').get(attendanceController.getTodayAttendance);

// router.route('/:date').get(attendanceController.getSingleDateAttendance);

export const SalaryRoutes = router;
