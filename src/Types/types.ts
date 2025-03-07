export type searchModal = {
  open: boolean;
  close: () => void;
};

export interface HttpError extends Error {
  response?: {
    data: string | null | Error;
  };
}

export type navListItem = {
  id: number;
  title: string;
  target?: string;
  visible?: boolean;
  children?: {
    id: number;
    title: string;
    target: string;
    visible?: boolean;
  }[];
};
export interface navListProps {
  loading: boolean;
  navlist: navListItem[] | [];
  openNav: boolean;
  errors: string | null | Error | object;
}

export type trackValues = {
  id: number;
  from: number;
  to: number;
};
