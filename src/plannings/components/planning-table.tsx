import React, { useEffect } from "react";
import { getCooperatives } from "../../api/cooperative";
import PevForm from "./pev-form";

const TableComponent = ({ planningList }: { planningList: any }) => {
  const headerColumns = ["PEV", "SEG", "TER", "QUA", "QUI", "SEX", ""];

  const [cooperatives, setCooperatives] = React.useState<any[]>([]);
  console.log(planningList);

  const dataPev = planningList.map(
    (cooperative: {
      documentId: any;
      client: { social_name: any };
      seg: { id: any; cooperative_name: any };
      ter: { id: any; cooperative_name: any };
      qua: { id: any; cooperative_name: any };
      qui: { id: any; cooperative_name: any };
      sex: { id: any; cooperative_name: any };
    }) => ({
      id: cooperative.documentId,

      title: `${cooperative?.client?.social_name || ""}`,
      seg: cooperative.seg
        ? {
            value: cooperative.seg.id,
            label: cooperative.seg.cooperative_name,
          }
        : "",
      ter: cooperative.ter
        ? {
            value: cooperative.ter.id,
            label: cooperative.ter.cooperative_name,
          }
        : "",
      qua: cooperative.qua
        ? {
            value: cooperative.qua.id,
            label: cooperative.qua.cooperative_name,
          }
        : "",
      quin: cooperative.qui
        ? {
            value: cooperative.qui.id,
            label: cooperative.qui.cooperative_name,
          }
        : "",
      sex: cooperative.sex
        ? {
            value: cooperative.sex.id,
            label: cooperative.sex.cooperative_name,
          }
        : "",
    })
  );

  useEffect(() => {
    const getCooperativesList = async () => {
      try {
        const response = await getCooperatives();
        console.log("cooperatives", response.data);
        setCooperatives(response.data);
      } catch (error) {
        console.error("Erro ao buscar as cooperativas:", error);
        return null;
      }
    };

    getCooperativesList();
  }, []);

  return (
    <div>
      <div
        style={{
          backgroundColor: "#F9F5ED",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {headerColumns.map((column, index) => (
          <div style={{}} key={index}>
            {column}
          </div>
        ))}
      </div>
      <div>
        {dataPev.map((pev: any, index: any) => (
          <PevForm title={pev?.title} cooperatives={cooperatives} pev={pev} />
        ))}
      </div>
    </div>
  );
};

export default TableComponent;
