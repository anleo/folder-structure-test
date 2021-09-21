export interface FolderItem {
  name: string | number;
  children?: Array<FolderItem>;
  isRoot: boolean;
  data?: string; // ????
  icon: string;
  isSelected?: boolean;
  price?: number | null;
}
