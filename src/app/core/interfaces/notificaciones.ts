export type NotificationType = 'success' | 'error' | 'info' | 'warning' | 'decision';

export interface Notification {
  id: number;
  message: string;
  type: NotificationType;
  duration?: number;
  callback?: (response: boolean) => void;
}
