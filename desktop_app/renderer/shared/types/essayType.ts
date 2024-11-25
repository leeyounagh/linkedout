export interface Essay {
    id: number;
    createdDate: string;
    updatedDate: string;
    status: string;
    linkedOutGauge: number;
    thumbnail: string;
    title: string;
    content: string;
    latitude: number;
    longitude: number;
    location: string;
    tags: Tag[];
    author: Author;
    story: Story;
    reviews: Review[];
    isBookmarked: boolean;
    isChecked?: boolean;
  }
  
  export interface Tag {
    id: number;
    name: string;
  }
  
  export interface Author {
    id: number;
    email: string;
    nickname: string;
    profileImage: string;
    gems: number;
    createdDate: string;
    isFirst: boolean;
    locationConsent: boolean;
    devices: Device[];
    homeLayouts: HomeLayout[];
  }
  
  export interface Device {
    id: number;
    uid: string;
    fcmToken: string;
    os: string;
    type: string;
    model: string;
  }
  
  export interface HomeLayout {
    id: number;
    isActive: boolean;
    updatedDate: string;
    homeItems: HomeItem[];
  }
  
  export interface HomeItem {
    id: number;
    item: Item;
  }
  
  export interface Item {
    id: number;
    name: string;
    position: string;
    price: number;
    url: string;
    owned: boolean;
  }
  
  export interface Story {
    id: number;
    name: string;
    createdDate: string;
    essaysCount: number;
    isIncluded?: boolean;
  }
  
  export interface Review {
    id: number;
    type: string;
    processed: boolean;
    createDate: string;
    processedDate: string;
    userId: number;
    essayId: number;
    essayTitle: string;
  }
  
  export interface AnotherEssay {
    id: number;
    createdDate: string;
    status: string;
    thumbnail: string;
    title: string;
    content: string;
    author: Author;
  }
  
  export interface EssayData {
    essay: Essay;
    anotherEssays: AnotherEssay;
  }

  export interface AnotherEssay {
    id: number;
    createdDate: string;
    status: string;
    thumbnail: string;
    title: string;
    content: string;
    author: Author;
  }
  
  export interface Author {
    id: number;
    email: string;
    nickname: string;
    profileImage: string;
    gems: number;
    createdDate: string;
    isFirst: boolean;
    locationConsent: boolean;
    devices: Device[];
    homeLayouts: HomeLayout[];
  }
  
  export interface Device {
    id: number;
    uid: string;
    fcmToken: string;
    os: string;
    type: string;
    model: string;
  }
  
  export interface HomeLayout {
    id: number;
    isActive: boolean;
    updatedDate: string;
    homeItems: HomeItem[];
  }
  
  export interface HomeItem {
    id: number;
    item: Item;
  }
  
  export interface Item {
    id: number;
    name: string;
    position: string;
    price: number;
    url: string;
    owned: boolean;
  }