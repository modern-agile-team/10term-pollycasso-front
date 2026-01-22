import type { ReactNode } from 'react';
import { toast } from 'react-toastify';
import type { ToastOptions } from 'react-toastify';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/solid';

// TODO: 디자인 시안 컨펌
const TOAST_COLORS = {
  success: 'text-green-400', // 디자인 시안: text-yellow-200 (연노랑)
  error: 'text-red-400', // 디자인 시안: text-pink-400 (분홍)
  info: 'text-blue-400',
  warning: 'text-yellow-400', // 디자인 시안: text-red-500 (붉은색)
};

const TOAST_STYLE: ToastOptions = {
  position: 'top-center',
  autoClose: 2000,
  closeButton: false,
  className: 'bg-white backdrop-blur-md border border-white/10 shadow-2xl',
};

const ToastLayout = ({
  message,
  icon,
}: {
  message: string;
  icon: ReactNode;
}) => (
  <div className="flex items-center gap-3 py-1 font-ssrm">
    <div className="flex-shrink-0">{icon}</div>
    <div className="flex-1 text-sm font-medium text-black">{message}</div>
  </div>
);

export const showToast = {
  success: (message: string) =>
    toast.success(
      <ToastLayout
        message={message}
        icon={<CheckCircleIcon className={`w-6 h-6 ${TOAST_COLORS.success}`} />}
      />,
      TOAST_STYLE,
    ),
  error: (message: string) =>
    toast.error(
      <ToastLayout
        message={message}
        icon={
          <ExclamationCircleIcon className={`w-6 h-6 ${TOAST_COLORS.error}`} />
        }
      />,
      TOAST_STYLE,
    ),
  info: (message: string) =>
    toast.info(
      <ToastLayout
        message={message}
        icon={
          <InformationCircleIcon className={`w-6 h-6 ${TOAST_COLORS.info}`} />
        }
      />,
      TOAST_STYLE,
    ),
  warning: (message: string) =>
    toast.warn(
      <ToastLayout
        message={message}
        icon={
          <ExclamationTriangleIcon
            className={`w-6 h-6 ${TOAST_COLORS.warning}`}
          />
        }
      />,
      TOAST_STYLE,
    ),
};
