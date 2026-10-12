"use client";

/**
 * ⚠ HARNESS CHANGE — simplified from the Code tab's demo-layout.tsx at the
 * user's request (2026-10-07). The published version is a three-card
 * "Agent Context Inspector" (identity card with avatar, activity grid, stats
 * row + JSON viewer). This keeps the same exports and props, so page.tsx is
 * unchanged apart from its default name, and only the inputs plus the JSON
 * the agent receives remain.
 */

import React from "react";
import { Input } from "./_components/input";
import { Select } from "./_components/select";
import { Checkbox } from "./_components/checkbox";
import { Label } from "./_components/label";

export const TIMEZONES = [
  "America/Los_Angeles",
  "America/New_York",
  "Europe/London",
  "Europe/Berlin",
  "Asia/Tokyo",
  "Australia/Sydney",
];

export const ACTIVITIES = [
  "Viewed the pricing page",
  "Added 'Pro Plan' to cart",
  "Watched the product demo video",
  "Started the 14-day free trial",
  "Invited a teammate",
];

interface DemoLayoutProps {
  userName: string;
  userTimezone: string;
  recentActivity: string[];
  onUserNameChange: (next: string) => void;
  onUserTimezoneChange: (next: string) => void;
  onToggleActivity: (activity: string) => void;
}

export function DemoLayout({
  userName,
  userTimezone,
  recentActivity,
  onUserNameChange,
  onUserTimezoneChange,
  onToggleActivity,
}: DemoLayoutProps) {
  const publishedContext = {
    name: userName,
    timezone: userTimezone,
    recentActivity,
  };

  return (
    <main className="min-h-screen w-full bg-neutral-50 px-6 py-10">
      <div
        data-testid="context-card"
        className="mx-auto max-w-xl space-y-6 rounded-xl border border-neutral-200 bg-white p-6"
      >
        <div>
          <h1 className="text-xl font-semibold text-neutral-900">
            What the agent knows about you
          </h1>
          <p className="mt-1 text-sm text-neutral-600">
            The agent can read these values but cannot change them. Edit
            them, then ask in the chat.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="ctx-name-input">Name</Label>
          <Input
            id="ctx-name-input"
            data-testid="ctx-name"
            type="text"
            value={userName}
            onChange={(e) => onUserNameChange(e.target.value)}
            placeholder="e.g. Sarah"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="ctx-tz-select">Timezone</Label>
          <Select
            id="ctx-tz-select"
            data-testid="ctx-timezone"
            value={userTimezone}
            onChange={(e) => onUserTimezoneChange(e.target.value)}
          >
            {TIMEZONES.map((tz) => (
              <option key={tz} value={tz}>
                {tz}
              </option>
            ))}
          </Select>
        </div>

        <fieldset className="flex flex-col gap-2">
          <legend className="mb-2 text-sm font-medium text-neutral-900">
            Recent activity
          </legend>
          {ACTIVITIES.map((activity) => {
            const slug = activity
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/^-|-$/g, "");
            return (
              <label
                key={activity}
                data-testid={`activity-${slug}`}
                className="flex cursor-pointer items-center gap-2 text-sm text-neutral-800"
              >
                <Checkbox
                  checked={recentActivity.includes(activity)}
                  onChange={() => onToggleActivity(activity)}
                />
                {activity}
              </label>
            );
          })}
        </fieldset>

        <div>
          <div className="mb-2 text-xs font-medium uppercase tracking-wide text-neutral-500">
            Sent to the agent
          </div>
          <pre
            data-testid="ctx-state-json"
            className="overflow-x-auto rounded-lg bg-neutral-900 p-4 font-mono text-xs leading-relaxed text-neutral-100"
          >
            {JSON.stringify(publishedContext, null, 2)}
          </pre>
        </div>
      </div>
    </main>
  );
}
