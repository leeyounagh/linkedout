export type User = {
    id: number;
    email: string;
    nickname: string;
    profileImage: string;
    gems: number;
    createdDate: string;
    isFirst: boolean;
    locationConsent: boolean;
    devices: UserDevice[];
    homeLayouts: UserHomeLayout[];
  };
  
  export type UserDevice = {
    id: number;
    uid: string;
    fcmToken: string;
    os: string;
    type: string;
    model: string;
  };
  
  export type UserHomeLayout = {
    id: number;
    isActive: boolean;
    updatedDate: string;
    homeItems: UserHomeItem[];
  };
  
  export type UserHomeItem = {
    id: number;
    item: {
      id: number;
      name: string;
      position: string;
      price: number;
      url: string;
      owned: boolean;
    };
  };
  
  export type Users = User[];