import { Moment } from "moment";
import { toast } from "react-toastify";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { getTypeResource } from "@/helpers/convert";

export type ResourceType = {
  id: string;
  type: "URL" | "IMG";
  name: string;
  src: string;
  createdAt: Moment;
};

export type ResourceList = {
  resourceList: ResourceType[];
  selectedResource?: ResourceType;
};

export interface ResourceState extends ResourceList {
  addResource: (resource: ResourceType) => void;
  removeResource: (resource: ResourceType) => void;
  editResourceName: (resource: ResourceType, name: string) => void;
  selectResource: (resource: ResourceType) => void;
  unselectResource: () => void;
}

export const initResourceData = {
  resourceList: [],
  selectedResource: undefined,
};

export const useResourceStore = create(
  immer<ResourceState>(set => ({
    ...initResourceData,
    addResource: resource => {
      toast.success(`[${resource.name}] ${getTypeResource(resource.type)} 추가에 성공했습니다!`);
      set(state => {
        state.resourceList.unshift(resource);
      });
    },
    removeResource: resource => {
      set(state => {
        state.resourceList = state.resourceList.filter(res => res.id !== resource.id);
        if (state.selectedResource?.id === resource.id) {
          state.selectedResource = undefined;
        }
      });
    },
    editResourceName: (resource, name) => {
      set(state => {
        const curResource = state.resourceList.find(res => res.id === resource.id);
        if (curResource?.name) {
          curResource.name = name;
        }
        if (state.selectedResource?.id === resource.id) {
          state.selectedResource.name = name;
        }
      });
    },
    selectResource: resource => {
      set(state => {
        state.selectedResource = resource;
      });
    },
    unselectResource: () => {
      set(state => {
        state.selectedResource = undefined;
      });
    },
  }))
);
