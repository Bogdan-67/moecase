export interface IGroup {
  id_group: number;
  name: string;
  created_at: string;
  position: number;
}

export interface IGroupData {
  groups: IGroup[];
}
