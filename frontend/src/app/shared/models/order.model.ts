export interface Order {
      id: number;
      userId: number;
      totalAmount: number;
      status: 'Pending' | 'Preparing' | 'OutForDelivery' | 'Delivered';
      createdAt: string;
}
