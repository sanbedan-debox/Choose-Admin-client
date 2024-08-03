import React, { useEffect, useState } from "react";
import RoopTable from "@/components/common/customTableR/table";
import Select from "react-select";
import { sdk } from "@/util/graphqlClient";
import useGlobalLoaderStore from "@/store/loader";
import ReusableModal from "@/components/common/modal/modal"; // Import your reusable modal
import { AddItemOptionInput, ItemOptionsEnum } from "@/generated/graphql";
import useGlobalStore from "@/store/global";
import { extractErrorMessage, formatDateString } from "@/util/utils";
import { useForm, SubmitHandler } from "react-hook-form";
import CButton from "@/components/common/button/button";
import { ButtonType } from "@/components/common/button/interface";
import { FaEdit } from "react-icons/fa";

const formatType = (type: ItemOptionsEnum): string => {
  switch (type) {
    case ItemOptionsEnum.PopularItem:
      return "Popular Item";
    case ItemOptionsEnum.UpSellItem:
      return "Upsell Item";
    case ItemOptionsEnum.HasNuts:
      return "Has Nuts";
    case ItemOptionsEnum.IsGlutenFree:
      return "Is Gluten Free";
    case ItemOptionsEnum.IsHalal:
      return "Is Halal";
    case ItemOptionsEnum.IsSpicy:
      return "Is Spicy";
    case ItemOptionsEnum.IsVegan:
      return "Is Vegan";

    default:
      return "";
  }
};

interface FormInput {
  type: { value: ItemOptionsEnum; label: string };
  displayName: string;
  desc: string;
}
interface FormEditInput {
  type: { value: ItemOptionsEnum; label: string };
  displayName: string;
  desc: string;
}

const MasterItemOptions: React.FC = () => {
  const [masterItemOptions, setMasterItemOptions] = useState<any[]>([]);
  const { setLoading, isLoading } = useGlobalLoaderStore();
  const { setToastData } = useGlobalStore();

  const [counter, setCounter] = useState(0);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [isChangeItemOption, setIsChangeItemOption] = useState(false);
  const [selectedAdminId, setSelectedAdminId] = useState<string | null>(null);

  const [btnLoading, setBtnLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    control,
  } = useForm<FormInput>();

  const {
    register: editRegister,
    handleSubmit: handleEditSubmit,
    reset: resetEdit,
    formState: { errors: editErrors },
    setValue: setEditValue,
    getValues,
    control: editControl,
  } = useForm<FormEditInput>();

  useEffect(() => {
    const fetchMasterItemOptions = async () => {
      setLoading(true);
      try {
        const response = await sdk.GetAllItemOptions();
        if (response && response.getAllItemOptions) {
          const formattedData = response.getAllItemOptions.map((tz) => ({
            ...tz,
            createdAt: formatDateString(tz.createdAt),
            updatedAt: formatDateString(tz.updatedAt),
          }));
          setMasterItemOptions(formattedData);
        }
      } catch (error: any) {
        const errorMessage = extractErrorMessage(error);
        setToastData({
          type: "error",
          message: errorMessage,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMasterItemOptions();
  }, [counter, setLoading, setToastData]);

  const typeOptions = Object.keys(ItemOptionsEnum).map((el) => ({
    value: el as ItemOptionsEnum,
    label: formatType(el as ItemOptionsEnum),
  }));

  const handleAddItemOption: SubmitHandler<FormInput> = async (data) => {
    try {
      setBtnLoading(true);
      const input: AddItemOptionInput = {
        type: data.type.value,
        displayName: data.displayName,
        desc: data.desc,
      };

      const response = await sdk.AddItemOption({
        input: {
          ...input,
        },
      });

      if (!response.addItemOption) {
        setToastData({
          message: "Item option cannot be added!",
          type: "error",
        });
        return;
      }

      reset();
      setIsAddModalOpen(false);
      setCounter((prev) => prev + 1);
      setToastData({
        message: "Item option added successfully",
        type: "success",
      });
    } catch (error: any) {
      const errorMessage = extractErrorMessage(error);
      setToastData({
        type: "error",
        message: errorMessage,
      });
    } finally {
      setBtnLoading(false);
    }
  };

  const handleEditItemOption: SubmitHandler<FormEditInput> = async (data) => {
    try {
      setBtnLoading(true);

      const response = await sdk.UpdateItemOption({
        input: {
          _id: selectedAdminId || "",
          type: data.type.value,
          displayName: data.displayName,
          desc: data.desc,
        },
      });

      if (!response.updateItemOption) {
        setToastData({
          message: "Item option cannot be updated!",
          type: "error",
        });
        return;
      }

      resetEdit();
      setIsChangeItemOption(false);
      setCounter((prev) => prev + 1);
      setToastData({
        message: "Item option updated successfully",
        type: "success",
      });
    } catch (error: any) {
      const errorMessage = extractErrorMessage(error);
      setToastData({
        type: "error",
        message: errorMessage,
      });
    } finally {
      setBtnLoading(false);
    }
  };

  const renderActions = (rowData: {
    _id: string;
    type: ItemOptionsEnum;
    displayName: string;
    desc: string;
  }) => (
    <div className="flex space-x-3 justify-center items-center">
      <FaEdit
        className="text-blue-500 cursor-pointer"
        onClick={() => {
          setSelectedAdminId(rowData._id);
          setIsChangeItemOption(true);

          setEditValue("type", {
            value: rowData.type,
            label: formatType(rowData.type),
          });
          setEditValue("desc", rowData.desc);
          setEditValue("displayName", rowData.displayName);
        }}
      />
    </div>
  );

  const headings = [
    {
      title: "Type",
      dataKey: "type",
      render: (rowData: { type: ItemOptionsEnum }) => {
        return <p>{formatType(rowData.type)}</p>;
      },
    },
    {
      title: "Display Name",
      dataKey: "displayName",
    },
    {
      title: "Description",
      dataKey: "desc",
    },
    { title: "Created By", dataKey: "createdBy.name" },
    { title: "Updated By", dataKey: "updatedBy.name" },
    { title: "Created At", dataKey: "createdAt" },
    { title: "Updated At", dataKey: "updatedAt" },
    { title: "Actions", dataKey: "id", render: renderActions },
  ];

  const mainActions = [
    {
      label: "Add Item Option",
      onClick: () => setIsAddModalOpen(true),
    },
  ];

  return (
    <div className="w-full mx-auto px-2">
      {/* {isLoading && <Loading />} */}
      <RoopTable
        loading={isLoading}
        data={masterItemOptions}
        itemsPerPage={10}
        headings={headings}
        hovered
        csvExport
        mainActions={mainActions}
        filterable
      />

      <ReusableModal
        title="Add New Item Option"
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          reset();
        }}
        width="md"
      >
        <form onSubmit={handleSubmit(handleAddItemOption)}>
          <div className="mb-4">
            <Select
              {...register("type", {
                required: { value: true, message: "Type is required" },
              })}
              onChange={(newVal) => {
                if (newVal) {
                  setValue("type", newVal);
                }
              }}
              options={typeOptions}
              className="mt-1 text-sm rounded-lg w-full focus:outline-none text-left text-black"
              classNamePrefix="react-select"
              placeholder="Select Type"
            />
            {errors.type && (
              <p className="text-red-500 text-sm">{errors.type.message}</p>
            )}
          </div>
          <div className="mb-4">
            <input
              {...register("displayName", {
                required: { value: true, message: "Display Name is required" },
              })}
              placeholder="Enter display name"
              className="input input-primary"
            />
            {errors.displayName && (
              <p className="text-red-500 text-sm">
                {errors.displayName.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <input
              {...register("desc", {
                required: { value: true, message: "Description is required" },
              })}
              placeholder="Enter description"
              className="input input-primary"
            />
            {errors.desc && (
              <p className="text-red-500 text-sm">{errors.desc.message}</p>
            )}
          </div>

          <div className="flex justify-end mt-4">
            <CButton
              loading={btnLoading}
              variant={ButtonType.Primary}
              className="btn btn-primary"
            >
              Add Item Option
            </CButton>
          </div>
        </form>
      </ReusableModal>
      <ReusableModal
        title="Change Item Option"
        comments="Are you sure you want to change the item option?"
        isOpen={isChangeItemOption}
        onClose={() => setIsChangeItemOption(false)}
        width="md"
      >
        <form onSubmit={handleEditSubmit(handleEditItemOption)}>
          <div className="mb-4">
            <Select
              isDisabled
              {...editRegister("type", {
                required: { value: true, message: "Type is required" },
              })}
              onChange={(newVal) => {
                if (newVal) {
                  setValue("type", newVal);
                }
              }}
              value={getValues("type")}
              options={typeOptions}
              className="mt-1 text-sm rounded-lg w-full focus:outline-none text-left text-black"
              classNamePrefix="react-select"
              placeholder="Select Type"
            />
            {errors.type && (
              <p className="text-red-500 text-sm">{errors.type.message}</p>
            )}
          </div>
          <div className="mb-4">
            <input
              {...editRegister("displayName", {
                required: { value: true, message: "Display Name is required" },
              })}
              placeholder="Enter display name"
              className="input input-primary"
            />
            {errors.displayName && (
              <p className="text-red-500 text-sm">
                {errors.displayName.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <input
              {...editRegister("desc", {
                required: { value: true, message: "Description is required" },
              })}
              placeholder="Enter description"
              className="input input-primary"
            />
            {errors.desc && (
              <p className="text-red-500 text-sm">{errors.desc.message}</p>
            )}
          </div>
          <div className="flex justify-end mt-4 space-x-2">
            <CButton variant={ButtonType.Primary} type="submit">
              Update
            </CButton>
          </div>
        </form>
      </ReusableModal>
    </div>
  );
};

export default MasterItemOptions;
