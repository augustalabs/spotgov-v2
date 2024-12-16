import React from 'react';
import { getContractLots } from '../api';
import { Lot } from '@/database/schemas';
interface Subfactor {
  Nome: string;
  Ponderação: string;
}

interface AwardCriterion {
  Nome: string;
  Ponderação: string;
  Subfatores?: Subfactor[];
}

interface ContractDetailsProps {
  contractId: string;
  linkDr: string;
  linkDelivery: string;
  summary: string;
  executionDeadlineDays: number;
  maxLots: number;
  maxLotsPerContestant: number;
  awardCriteria: AwardCriterion[];
  renews: boolean;
}

export default async function ContractDetails({
  contractId,
  linkDr,
  linkDelivery,
  summary,
  executionDeadlineDays,
  maxLots,
  maxLotsPerContestant,
  awardCriteria,
  renews,
}: ContractDetailsProps) {
  const lots = await getContractLots({ contractId });
  const renderAwardCriteria =  (criteria: AwardCriterion[]) => {

    
    return (
      <ul>
        {criteria.map((criterion, index) => (
          <li key={index}>
            <strong>Nome:</strong> {criterion.Nome} <br />
            <strong>Ponderação:</strong> {criterion.Ponderação}
            {criterion.Subfatores && criterion.Subfatores.length > 0 && (
              <ul>
                {criterion.Subfatores.map((subfactor, subIndex) => (
                  <li key={subIndex}>
                    <strong>Nome:</strong> {subfactor.Nome} <br />
                    <strong>Ponderação:</strong> {subfactor.Ponderação}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    );
  };

  const renderLots = (lots: Lot[]) => {
    return (
      <div>
        <h3>Lots</h3>
        {lots.length > 0 ? (
          <ul>
            {lots.map((lot) => (
              <li key={lot.id}>
                <strong>Lot Number:</strong> {lot.lotNumber} <br />
                <strong>Description:</strong> {lot.description} <br />
                <strong>Base Price:</strong> {lot.basePrice} <br />
                <strong>CPVs:</strong> {lot.cpvs?.join(', ') || 'N/A'}
              </li>
            ))}
          </ul>
        ) : (
          <p>No lots available for this contract.</p>
        )}
      </div>
    );
  };

  return (
    <div>
      <h1>Contract Details</h1>
      <p>
        <strong>Link DR:</strong> {linkDr}
      </p>
      <p>
        <strong>Link Delivery:</strong> {linkDelivery}
      </p>
      <p>
        <strong>Summary:</strong> {summary}
      </p>
      <p>
        <strong>Execution Deadline (Days):</strong> {executionDeadlineDays}
      </p>
      <p>
        <strong>Max Lots:</strong> {maxLots}
      </p>
      <p>
        <strong>Max Lots Per Contestant:</strong> {maxLotsPerContestant}
      </p>
      <p>
        <strong>Award Criteria:</strong>
      </p>
      {awardCriteria && awardCriteria.length > 0 ? (
        renderAwardCriteria(awardCriteria)
      ) : (
        <p>No award criteria available.</p>
      )}
      <p>
        <strong>Renews:</strong> {renews ? 'Yes' : 'No'}
      </p>

      {/* Render the lots */}
      {renderLots(lots)}
    </div>
  );
}