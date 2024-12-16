import React from 'react';

interface ReviewBodyInfo {
  phone?: string;
  locality?: string;
  fax?: string;
  designation?: string;
  address?: string;
  emailAddress?: string;
  postalCode?: string;
}

interface IssuerInfo {
  urlAddress?: string;
  municipality?: string;
  nutIII?: string;
  parish?: string;
  contactOrgan?: string;
  postalCode?: string;
  district?: string;
  nipc?: string;
  phone?: string;
  locality?: string;
  country?: string;
  fax?: string;
  adjudicatingEntityDesignation?: string;
  address?: string;
  emailAddress?: string;
}

interface ContractIssuerInfoProps {
  reviewBodyInfo: ReviewBodyInfo;
  issuerInfo: IssuerInfo;
}

export default function ContractIssuerInfo({
  reviewBodyInfo,
  issuerInfo,
}: ContractIssuerInfoProps) {
  return (
    <div>
      <h2>Issuer Information</h2>
      <p>
        <strong>Adjudicating Entity Designation:</strong>{' '}
        {issuerInfo.adjudicatingEntityDesignation}
      </p>
      <p>
        <strong>Contact Organ:</strong> {issuerInfo.contactOrgan}
      </p>
      <p>
        <strong>Address:</strong> {issuerInfo.address}
      </p>
      <p>
        <strong>Locality:</strong> {issuerInfo.locality}
      </p>
      <p>
        <strong>Postal Code:</strong> {issuerInfo.postalCode}
      </p>
      <p>
        <strong>District:</strong> {issuerInfo.district}
      </p>
      <p>
        <strong>Municipality:</strong> {issuerInfo.municipality}
      </p>
      <p>
        <strong>Parish:</strong> {issuerInfo.parish}
      </p>
      <p>
        <strong>Country:</strong> {issuerInfo.country}
      </p>
      <p>
        <strong>NIPC:</strong> {issuerInfo.nipc}
      </p>
      <p>
        <strong>Phone:</strong> {issuerInfo.phone}
      </p>
      <p>
        <strong>Fax:</strong> {issuerInfo.fax}
      </p>
      <p>
        <strong>Email Address:</strong> {issuerInfo.emailAddress}
      </p>
      <p>
        <strong>URL Address:</strong> {issuerInfo.urlAddress}
      </p>

      <h2>Review Body Information</h2>
      <p>
        <strong>Designation:</strong> {reviewBodyInfo.designation}
      </p>
      <p>
        <strong>Address:</strong> {reviewBodyInfo.address}
      </p>
      <p>
        <strong>Locality:</strong> {reviewBodyInfo.locality}
      </p>
      <p>
        <strong>Postal Code:</strong> {reviewBodyInfo.postalCode}
      </p>
      <p>
        <strong>Phone:</strong> {reviewBodyInfo.phone}
      </p>
      <p>
        <strong>Fax:</strong> {reviewBodyInfo.fax}
      </p>
      <p>
        <strong>Email Address:</strong> {reviewBodyInfo.emailAddress}
      </p>
    </div>
  );
}