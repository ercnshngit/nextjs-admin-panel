"use client";

import DeleteItem from "@/components/DeleteItem";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DATABASE_TABLE, getDatabaseTable } from "@/config/general";
import { translate } from "@/langs";
import { getTableItem } from "@/services/panel";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
import Form from "./form";

export default function Update({
  params,
}: {
  params: { id: string; slug: string };
}) {
  const [open, setOpen] = React.useState(false);
  const { id, slug } = params;
  const table = getDatabaseTable(slug);
  const tableName = table?.name || "";

  return (
    <>
      <div className="container py-10 mx-auto">
        <div className="flex justify-between mb-4">
          <h3 className="text-lg font-medium">
            {translate(tableName)} Düzenle
          </h3>
          <div>
            <Button asChild>
              <Link href={"/admin/" + tableName}>
                <ArrowLeftIcon className="w-4 h-4 mr-2" />
                Geri Dön
              </Link>
            </Button>
          </div>
        </div>

        <Card className="min-h-[700px]">
          <CardHeader>
            <div className="flex justify-between">
              <h3 className="text-lg font-medium">
                {id} Numaralı {translate(tableName)}
              </h3>
              <DeleteItem
                open={open}
                setOpen={setOpen}
                tableName={tableName}
                id={id}
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-start py-10">
              <Form id={Number(id)} table={table as DATABASE_TABLE} />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
