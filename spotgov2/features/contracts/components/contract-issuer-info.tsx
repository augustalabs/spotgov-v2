import { Separator } from "@/components/ui/separator";

import { Button } from "@/components/ui/button";
import { Mail, MapPin, MoveUpRight, Phone } from "lucide-react";
import Link from "next/link";

import Image from "next/image";
import React from "react";
import { ContractIssuerInfoProps } from "@/types";

export default function ContractIssuerInfo({
  reviewBodyInfo,
  issuerInfo,
}: ContractIssuerInfoProps) {
  return (
    <div className="mt-8 space-y-4">
      {/* Header Section */}
      <div className="flex gap-2">
        <div className="relative h-20 w-20 shrink-0 rounded-lg border-[1.5px] border-[#F0F2F5]">
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
            <p className="text-sm text-[#666F8D]">{issuerInfo?.contactOrgan}</p>
          </div>
          {/* NIPC and URL Address */}
          <div className="space-x-2">
            {issuerInfo?.nipc && (
              <Button
                variant="outline"
                size="sm"
                className="border-[1.5px] text-xs font-semibold"
              >
                <div className="flex items-center space-x-2">
                  <span className="rounded-2xl border-[1.5px] border-[#666F8D] px-1 text-[8px] font-semibold text-[#666F8D]">
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
                className="border-[1.5px] text-xs font-semibold"
              >
                <a
                  href={
                    issuerInfo.urlAddress.startsWith("https://") ||
                    issuerInfo.urlAddress.startsWith("http://")
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
      <div className="flex flex-col gap-2 text-sm text-[#666F8D]">
        <p className="text-[#B3B7C6]">Informação Geral</p>
        {/* Address */}
        {issuerInfo?.address && (
          <div className="flex items-center gap-1">
            <MapPin size={16} />
            <p className="text-wrap">
              {issuerInfo.address}
              {issuerInfo.district && `, ${issuerInfo.district}`}
              {issuerInfo.postalCode && (
                <span className="ml-1 text-[#666F8D]/50">
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
      <div className="flex flex-col gap-2 text-sm text-[#666F8D]">
        <p className="text-[#B3B7C6]">Órgão de Recursos Administrativos</p>
        {/* Address */}
        {reviewBodyInfo?.address && (
          <div className="flex items-center gap-1">
            <MapPin size={16} />
            <p className="text-wrap">
              {reviewBodyInfo.address}
              {reviewBodyInfo.locality && `, ${reviewBodyInfo.locality}`}
              {reviewBodyInfo.postalCode && (
                <span className="ml-1 text-[#666F8D]/50">
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
