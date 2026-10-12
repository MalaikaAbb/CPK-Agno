/**
 * ⚠ REPO-AUTHORED — not from the CopilotKit docs.
 *
 * The HITL overview's second demo (`gen-ui-interrupt/page.tsx`, published in
 * its Code tab) imports `generateFallbackSlots` from
 * `../_shared/interrupt-fallback-slots`. That module is not in the docs'
 * demo bundle for Agno, or for any other framework.
 *
 * All the call site tells us is the contract: no arguments, returns the
 * `TimeSlot[]` the published `TimePickerCard` renders. So this returns four
 * upcoming slots — the next two weekdays at 10:00 and 14:00 local time — and
 * nothing else. The labels follow the shape of the hitl-in-chat demo's
 * published `DEFAULT_SLOTS` ("Tomorrow 10:00 AM").
 */

import type { TimeSlot } from "../gen-ui-interrupt/_components/time-picker-card";

const HOURS = [10, 14];

export function generateFallbackSlots(): TimeSlot[] {
  const slots: TimeSlot[] = [];
  const day = new Date();
  day.setHours(0, 0, 0, 0);

  while (slots.length < HOURS.length * 2) {
    day.setDate(day.getDate() + 1);
    const weekday = day.getDay();
    if (weekday === 0 || weekday === 6) continue;

    for (const hour of HOURS) {
      const at = new Date(day);
      at.setHours(hour);
      const dayLabel = at.toLocaleDateString(undefined, { weekday: "long" });
      const timeLabel = at.toLocaleTimeString(undefined, {
        hour: "numeric",
        minute: "2-digit",
      });
      slots.push({ label: `${dayLabel} ${timeLabel}`, iso: at.toISOString() });
    }
  }

  return slots;
}
