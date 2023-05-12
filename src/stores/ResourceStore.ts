import { Moment } from "moment";
import { toast } from "react-toastify";
import { create } from "zustand";

export type ResourceType = {
  id: string;
  type: "URL" | "IMG";
  name: string;
  src: string;
  selected: boolean;
  createdAt: Moment;
};

export type ResourceList = {
  resourceList: ResourceType[];
};

export interface ResourceState extends ResourceList {
  addResource: (resource: ResourceType) => void;
  removeResource: (resource: ResourceType) => void;
  editResourceName: (resource: ResourceType, name: string) => void;
  selectResource: (resource: ResourceType) => void;
  unselectResource: () => void;
  currentResource: () => ResourceType | undefined;
}

export const initResourceData = {
  resourceList: [],
};

export const useResourceStore = create<ResourceState>((set, get) => ({
  ...initResourceData,
  addResource: resource => {
    toast.success(`[${resource.name}] 리소스 추가 성공!`);
    set(state => ({
      resourceList: [resource, ...state.resourceList],
    }));
  },
  removeResource: resource => {
    set(state => ({
      resourceList: state.resourceList.filter(res => res !== resource),
    }));
  },
  editResourceName: (resource, name) => {
    set(state => ({
      resourceList: state.resourceList.map(res => ({
        ...res,
        ...(res === resource && { name }),
      })),
    }));
  },
  selectResource: resource => {
    set(state => ({
      resourceList: state.resourceList.map(res => ({
        ...res,
        selected: false,
        ...(res === resource && { selected: true }),
      })),
    }));
  },
  unselectResource: () => {
    set(state => ({
      resourceList: state.resourceList.map(res => ({
        ...res,
        selected: false,
      })),
    }));
  },
  currentResource: () => get().resourceList.find(res => res.selected),
}));
