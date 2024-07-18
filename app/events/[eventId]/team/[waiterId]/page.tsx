import Link from "next/link";
import React from "react";

const WaiterDetailPage = () => {
  return (
    <div>
      WaiterDetailPage
      <p>
        {
          "Mission: aller et faire de toutes les nations des disciples 1 Tim 2: 4"
        }
      </p>
      <Link href="/events/1/teams/4/tables">Voir mes tables</Link>
    </div>
  );
};

export default WaiterDetailPage;
