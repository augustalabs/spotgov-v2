import { Separator } from '@/components/ui/separator';

import { Button } from '@/components/ui/button';
import { Mail, MapPin, MoveUpRight, Phone } from 'lucide-react';
import Link from 'next/link';

import Image from 'next/image';
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
    
      <div className="space-y-4 mt-8">
        {/* Header Section */}
        <div className="flex gap-2">
          <div className="relative w-20 h-20 rounded-lg border-[1.5px] border-[#F0F2F5] shrink-0">
            <Image
              src="/assets/images/thumbnail-image.png"
              alt="thumbnail image"
              layout="fill"
              className="rounded-lg object-cover object-center"
            />
          </div>
          <div className="space-y-3">
            <div>
              <p className="font-semibold">
                {issuerInfo?.adjudicatingEntityDesignation}
              </p>
              <p className="text-sm text-[#666F8D]">
                {issuerInfo?.contactOrgan}
              </p>
            </div>
            {/* NIPC and URL Address */}
            <div className="space-x-2">
              {issuerInfo?.nipc && (
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs font-semibold border-[1.5px]"
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-[8px] border-[#666F8D] border-[1.5px] rounded-2xl px-1 text-[#666F8D] font-semibold">
                      NIPC
                    </span>
                    <span>{issuerInfo.nipc}</span>
                  </div>
                </Button>
              )}

              {issuerInfo?.urlAddress && (
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="text-xs font-semibold border-[1.5px]"
                >
                  <a
                    href={
                      issuerInfo.urlAddress.startsWith('https://') ||
                      issuerInfo.urlAddress.startsWith('http://')
                        ? issuerInfo.urlAddress
                        : `https://${issuerInfo.urlAddress}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1"
                  >
                    <span>{issuerInfo.urlAddress}</span>
                    <MoveUpRight size={16} />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
        <Separator />

        {/* General Information */}
        <div className="text-[#666F8D] text-sm flex flex-col gap-2">
          <p className="text-[#B3B7C6]">Informação Geral</p>
          {/* Address */}
          {issuerInfo?.address && (
            <div className="flex items-center gap-1">
              <MapPin size={16} />
              <p className="text-wrap">
                {issuerInfo.address}
                {issuerInfo.district && `, ${issuerInfo.district}`}
                {issuerInfo.postalCode && (
                  <span className="text-[#666F8D]/50 ml-1">
                    {issuerInfo.postalCode}
                  </span>
                )}
              </p>
            </div>
          )}
          {/* Email */}
          {issuerInfo?.emailAddress && (
            <Link
              href={`mailto:${issuerInfo.emailAddress}`}
              className="hover:text-[#2388FF]"
            >
              <div className="flex items-center gap-1">
                <Mail size={16} />
                <p className="text-wrap">{issuerInfo.emailAddress}</p>
                <MoveUpRight size={16} />
              </div>
            </Link>
          )}
          {/* Phone */}
          {issuerInfo?.phone && (
            <Link
              href={`tel:${issuerInfo.phone}`}
              className="hover:text-[#2388FF]"
            >
              <div className="flex items-center gap-1">
                <Phone size={16} />
                <p className="text-wrap">{issuerInfo.phone}</p>
                <MoveUpRight size={16} />
              </div>
            </Link>
          )}
        </div>
        <Separator />

        {/* Review Body Information */}
        <div className="text-[#666F8D] text-sm flex flex-col gap-2">
          <p className="text-[#B3B7C6]">Órgão de Recursos Administrativos</p>
          {/* Address */}
          {reviewBodyInfo?.address && (
            <div className="flex items-center gap-1">
              <MapPin size={16} />
              <p className="text-wrap">
                {reviewBodyInfo.address}
                {reviewBodyInfo.locality && `, ${reviewBodyInfo.locality}`}
                {reviewBodyInfo.postalCode && (
                  <span className="text-[#666F8D]/50 ml-1">
                    {reviewBodyInfo.postalCode}
                  </span>
                )}
              </p>
            </div>
          )}
          {/* Email */}
          {reviewBodyInfo?.emailAddress && (
            <Link
              href={`mailto:${reviewBodyInfo.emailAddress}`}
              className="hover:text-[#2388FF]"
            >
              <div className="flex items-center gap-1">
                <Mail size={16} />
                <p className="text-wrap">{reviewBodyInfo.emailAddress}</p>
                <MoveUpRight size={16} />
              </div>
            </Link>
          )}
          {/* Phone */}
          {reviewBodyInfo?.phone && (
            <Link
              href={`tel:${reviewBodyInfo.phone}`}
              className="hover:text-[#2388FF]"
            >
              <div className="flex items-center gap-1">
                <Phone size={16} />
                <p className="text-wrap">{reviewBodyInfo.phone}</p>
                <MoveUpRight size={16} />
              </div>
            </Link>
          )}
        </div>
      </div>

  );
}