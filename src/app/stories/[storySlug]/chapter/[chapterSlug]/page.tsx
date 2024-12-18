import { createReader } from '@keystatic/core/reader';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Markdoc from '@markdoc/markdoc';
import React from 'react';

import keystaticConfig from '../../../../../../keystatic.config';

const reader = createReader(process.cwd(), keystaticConfig);

export default async function Page({
  params,
}: {
  params: { chapterSlug: string };
}) {
  const { chapterSlug } = await params;
  const chapter = await reader.collections.chapters.read(chapterSlug);

  console.log(chapter);

  if (!chapter) {
    notFound();
  }

  return <div>poo</div>;
}
