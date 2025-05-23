import React from 'react';
import { Modal, InputNumber, DatePicker } from 'antd';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useQuery } from '@tanstack/react-query';
import { http } from '@/app/lib/client/apiAdmin';
import {
  Booking,
  RoomInfo,
  UserInfo,
} from '@/app/[locale]/admin/bookings/page';

interface EditBookingModalProps {
  isEditModalOpen: boolean;
  selectedBooking: Booking | null;
  editForm: Booking | null;
  editing: boolean;
  mode: 'edit' | 'add';
  setEditForm: (form: Booking | null) => void;
  handleSave: (formData: Booking) => void;
  closeModal: () => void;
}

const EditBookingModal: React.FC<EditBookingModalProps> = ({
  isEditModalOpen,
  editForm,
  editing,
  mode,
  handleSave,
  closeModal,
}) => {
  const formik = useFormik<Booking>({
    initialValues: {
      maPhong: editForm?.maPhong || 0,
      maNguoiDung: editForm?.maNguoiDung || 0,
      ngayDen: editForm?.ngayDen || '',
      ngayDi: editForm?.ngayDi || '',
      soLuongKhach: editForm?.soLuongKhach || 1,
      id: editForm?.id || 0,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      maPhong: Yup.number().min(1, 'Invalid Room ID').required('Required'),
      maNguoiDung: Yup.number().min(1, 'Invalid User ID').required('Required'),
      ngayDen: Yup.string().required('Check-in date is required'),
      ngayDi: Yup.string().required('Check-out date is required'),
      soLuongKhach: Yup.number()
        .min(1, 'At least 1 guest')
        .required('Required'),
    }),
    onSubmit: (values) => {
      handleSave(values);
    },
  });

  // Fetch room info based on maPhong
  const { data: roomInfo, isLoading: roomLoading } = useQuery({
    queryKey: ['room', formik.values.maPhong],
    queryFn: () => http.get<RoomInfo>(`/phong-thue/${formik.values.maPhong}`),
    enabled: !!formik.values.maPhong && formik.values.maPhong > 0,
    staleTime: 1000 * 60 * 5,
  });

  // Fetch user info based on maNguoiDung
  const { data: userInfo, isLoading: userLoading } = useQuery({
    queryKey: ['user', formik.values.maNguoiDung],
    queryFn: () => http.get<UserInfo>(`/users/${formik.values.maNguoiDung}`),
    enabled: !!formik.values.maNguoiDung && formik.values.maNguoiDung > 0,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <Modal
      title={
        <span className="text-xl font-semibold text-gray-800">
          {mode === 'edit' ? 'Edit Booking Details' : 'Add New Booking'}
        </span>
      }
      open={isEditModalOpen}
      onOk={() => formik.handleSubmit()}
      confirmLoading={editing}
      onCancel={closeModal}
      okText={mode === 'edit' ? 'Save' : 'Add'}
      cancelText="Cancel"
      okButtonProps={{ className: 'bg-blue-600 hover:bg-blue-700 text-white' }}
      cancelButtonProps={{
        className: 'border-gray-300 hover:border-gray-400 text-gray-700',
      }}
      width={700}
      style={{ top: 20 }}
    >
      <div className="p-6 bg-white rounded-lg shadow-sm space-y-6 ">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Room ID
            </label>
            <InputNumber
              value={formik.values.maPhong}
              onChange={(value) => {
                formik.setFieldValue('maPhong', value || 0);
              }}
              onBlur={formik.handleBlur}
              min={0}
              className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
              style={{ minWidth: '100%' }}
            />
            {formik.touched.maPhong && formik.errors.maPhong && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.maPhong}
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              User ID
            </label>
            <InputNumber
              value={formik.values.maNguoiDung}
              onChange={(value) => {
                formik.setFieldValue('maNguoiDung', value || 0);
              }}
              onBlur={formik.handleBlur}
              min={0}
              className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
              style={{ minWidth: '100%' }}
            />
            {formik.touched.maNguoiDung && formik.errors.maNguoiDung && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.maNguoiDung}
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Check-in Date
            </label>
            <DatePicker
              value={
                formik.values.ngayDen ? dayjs(formik.values.ngayDen) : null
              }
              onChange={(date) =>
                formik.setFieldValue('ngayDen', date ? date.toISOString() : '')
              }
              onBlur={formik.handleBlur}
              className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
              style={{ minWidth: '100%' }}
              format="YYYY-MM-DD"
            />
            {formik.touched.ngayDen && formik.errors.ngayDen && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.ngayDen}
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Check-out Date
            </label>
            <DatePicker
              value={formik.values.ngayDi ? dayjs(formik.values.ngayDi) : null}
              onChange={(date) =>
                formik.setFieldValue('ngayDi', date ? date.toISOString() : '')
              }
              onBlur={formik.handleBlur}
              className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
              style={{ minWidth: '100%' }}
              format="YYYY-MM-DD"
            />
            {formik.touched.ngayDi && formik.errors.ngayDi && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.ngayDi}
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Number of Guests
            </label>
            <InputNumber
              value={formik.values.soLuongKhach}
              onChange={(value) =>
                formik.setFieldValue('soLuongKhach', value || 0)
              }
              onBlur={formik.handleBlur}
              min={0}
              className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
              style={{ minWidth: '100%' }}
            />
            {formik.touched.soLuongKhach && formik.errors.soLuongKhach && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.soLuongKhach}
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 pt-4">
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            Booking Summary
          </h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              {roomLoading ? (
                <p className="text-sm text-gray-500">
                  Loading room information...
                </p>
              ) : roomInfo ? (
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-700">
                    Room: {roomInfo.tenPhong}
                  </p>
                  <p className="text-sm text-gray-600">
                    Price: ${roomInfo.giaTien.toLocaleString()}
                  </p>
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  No room information available
                </p>
              )}
              <div className="space-y-2 mt-2">
                <p className="text-sm text-gray-600">
                  Check-in:{' '}
                  {formik.values.ngayDen
                    ? new Date(formik.values.ngayDen).toLocaleDateString(
                        'en-GB'
                      )
                    : '-'}
                </p>
                <p className="text-sm text-gray-600">
                  Check-out:{' '}
                  {formik.values.ngayDi
                    ? new Date(formik.values.ngayDi).toLocaleDateString('en-GB')
                    : '-'}
                </p>
                <p className="text-sm text-gray-600">
                  Guests: {formik.values.soLuongKhach || '-'}
                </p>
              </div>
            </div>
            <div>
              {userLoading ? (
                <p className="text-sm text-gray-500">
                  Loading user information...
                </p>
              ) : userInfo ? (
                <div className="flex items-center space-x-4">
                  <img
                    src={userInfo.avatar || '/default-avatar.png'}
                    alt="User Avatar"
                    className="w-12 h-12 rounded-full object-cover border border-gray-200"
                  />
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-gray-700">
                      {userInfo.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      Email: {userInfo.email}
                    </p>
                    <p className="text-sm text-gray-600">
                      Phone: {userInfo.phone}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  No user information available
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditBookingModal;
