import React from "react";
import { Modal, Descriptions, Button } from "antd";
import { Room } from "@/app/types/room/room";

interface DeleteRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  room: Room | null;
  onConfirm: (roomId: number) => void;
  isDeleting: boolean;
}

const DeleteRoomModal: React.FC<DeleteRoomModalProps> = ({
  isOpen,
  onClose,
  room,
  onConfirm,
  isDeleting,
}) => {
  if (!room) return null;

  return (
    <Modal
      title="Xác nhận xóa phòng"
      open={isOpen}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Hủy
        </Button>,
        <Button
          key="delete"
          type="primary"
          danger
          onClick={() => onConfirm(room.id)}
          loading={isDeleting}
        >
          Xóa
        </Button>,
      ]}
      width={600}
    >
      <p className="mb-4">Bạn có chắc chắn muốn xóa phòng này? Hành động này không thể hoàn tác.</p>
      <Descriptions bordered column={1}>
        <Descriptions.Item label="ID">{room.id}</Descriptions.Item>
        <Descriptions.Item label="Tên phòng">{room.tenPhong}</Descriptions.Item>
        <Descriptions.Item label="Số khách">{room.khach}</Descriptions.Item>
        <Descriptions.Item label="Phòng ngủ">{room.phongNgu}</Descriptions.Item>
        <Descriptions.Item label="Giường">{room.giuong}</Descriptions.Item>
        <Descriptions.Item label="Phòng tắm">{room.phongTam}</Descriptions.Item>
        <Descriptions.Item label="Giá tiền">
          {room.giaTien.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
        </Descriptions.Item>
        <Descriptions.Item label="Mô tả">{room.moTa}</Descriptions.Item>
        <Descriptions.Item label="URL hình ảnh">{room.hinhAnh}</Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default DeleteRoomModal;