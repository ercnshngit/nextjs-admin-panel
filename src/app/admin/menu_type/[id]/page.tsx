"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { translate } from "@/langs";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMenu, updateMenu, deleteMenu, getMenuItems } from "@/services/menu";
import { UniqueIdentifier } from "@dnd-kit/core";

import MenuList from "../menu-list";
import { CREATE_MENU_ITEM, MENU_ITEM, UPDATE_MENU_ITEM } from "@/types/menus";
import { useRouter } from "next/navigation";
import { getTableItem } from "@/services/panel";
import { MENU_TYPE } from "@/types/menu_types";

export default function MenuType({ params }: { params: { id: string } }) {
  const id = params.id;
  const { data: menu_type, error: isError } = useQuery<MENU_TYPE, Error>(
    ["menu_type", id],
    () => getTableItem({ id: Number(id), tableName: "menu_type" }),
    { enabled: !!id }
  );
  if (menu_type) {
    return <Menu slug={menu_type.slug} lang={menu_type.language_code} />;
  } else {
    return <div>Bulunamadı</div>;
  }
}

export function Menu({ slug, lang }: { slug: string; lang: "TR" | "EN" }) {
  const { data, error } = useQuery<{ menus: { menu: MENU_ITEM }[] }, Error>(
    ["menu", slug, lang],
    () => getMenuItems({ slug, lang })
  );
  const queryClient = useQueryClient();
  const updateMutation = useMutation(
    (data: UPDATE_MENU_ITEM) => updateMenu({ id: data.id, data: data.data }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["menu"]);
        console.log("updateMutation");
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );
  const router = useRouter();

  const handleUpdate = (id: UniqueIdentifier, parentId: UniqueIdentifier) => {
    const item = data?.menus.find((menu) => menu.menu.title === id);
    const parentItem = data?.menus.find((menu) => menu.menu.title === parentId);

    updateMutation.mutate({
      id: item?.menu.id as number,
      data: {
        menu_belong_id: parentItem?.menu.id as number,
      },
    });
  };

  const handleRemove = (id: UniqueIdentifier) => {};

  return (
    <div className="container py-10 mx-auto">
      <div className="flex justify-between mb-4">
        <h3 className="text-lg font-medium">{translate("menu")}</h3>
        <div>
          <Button asChild>
            <Link href={"/admin/menu/ekle"}>
              <PlusCircledIcon className="w-4 h-4 mr-2" />
              Yeni {translate("menu")} ekle
            </Link>
          </Button>
        </div>
      </div>

      <Card className="min-h-[700px]">
        <CardContent>
          <div className="py-10">
            {data && data.menus?.length > 0 ? (
              <MenuList
                data={data}
                handleUpdate={handleUpdate}
                onRemove={handleRemove}
              />
            ) : (
              <div>
                Menü yok,{" "}
                <Link href={"/admin/menu/ekle"}>
                  yeni menü eklemek için tıklayınız.
                </Link>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
