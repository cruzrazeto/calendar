import React from 'react'

import { dateFnsLocalizer } from 'react-big-calendar';
import { parse,startOfWeek,getDay,format } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import esES from 'date-fns/locale/es';
const locales = {
  'es': esES,
}

export const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})
