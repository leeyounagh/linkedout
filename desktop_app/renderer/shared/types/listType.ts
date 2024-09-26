export type pageType = {
  page: number;
  limit: number;
};

export interface Alert {
    id: number;
    title: string;
    content: string;
    body: string;
    type:"published" | "support" | "linkedout";
    read: boolean;
    createdDate: string;
    essay: {
        id:number
    };
  }
  
  export interface AlarmListResponse {
    alerts: Alert[];
    page: number;
    total: number;
    totalPage: number;
  }