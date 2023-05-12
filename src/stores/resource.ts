import { Moment } from "moment";
import { create } from "zustand";

export type ResourceType = {
  id: string;
  type: "URL" | "IMG";
  source: string;
  selected: boolean;
  createdAt: Moment;
  imgSrc?: string;
};

export type ResourceList = {
  resourceList: ResourceType[];
};

export interface ResourceState extends ResourceList {
  addResource: (resource: ResourceType) => void;
  removeResource: (resource: ResourceType) => void;
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
    set(state => ({
      resourceList: [resource, ...state.resourceList],
    }));
  },
  removeResource: resource => {
    set(state => ({
      resourceList: state.resourceList.filter(res => res !== resource),
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
  currentResource: () => {
    return get().resourceList.find(res => res.selected);
  },
}));
