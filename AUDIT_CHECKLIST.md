# Audit Checklist - LeadDesk Mini

## Folder Structure ✅
- ✅ server/ folders: controllers, middleware, models, routes, config, utils
- ✅ client/src folders: components, pages, layouts, context, hooks, services, utils, assets

## Backend Issues to Fix

### Critical
- ❌ Missing `/api/leads/stats` endpoint for aggregated statistics
- ❌ Dashboard.jsx destructures non-existent properties from useLeads() hook - WILL CRASH
- ⚠ `app.js` routes leadRoutes before authRoutes - search route `/leads/search` must be defined BEFORE `/leads/:id` to avoid route conflicts (actually this is fine in current order)

### Improvements Needed
- ⚠ Add duplicate submission prevention (check email + name combo)
- ⚠ Add sanitization via mongo-express-sanitize or manual strip
- ⚠ Improve error messages for MongoDB duplicate key errors
- ⚠ CORS should allow production Render/Vercel URLs

## Frontend Issues to Fix

### Critical
- ❌ **Dashboard.jsx**: Destructures `totalLeads`, `stats`, `page`, `totalPages`, `setSearchQuery`, `changePage`, `updateLeadStatus` - NONE of these exist in `useLeads()` return
- ❌ `useLeads()` hook doesn't compute/return stats, totalLeads, etc.
- ❌ `authService.js` / `leadService.js` - need to verify response structure matches backend

### Missing Features
- ❌ No loading spinner/disabled state on LeadForm submit button
- ❌ No duplicate submission prevention on LeadForm
- ❌ No confirmation modal triggered on status select change (it should open modal first, not directly change)
- ❌ No page transition animations (only fade-in exists but not connected)
- ❌ No proper empty state for search with no results
- ❌ No error page for 404 routes
- ❌ AuthContext doesn't show loading state properly on initial page load for protected routes

### UI/UX Improvements
- ⚠ Add keyboard focus states to all interactive elements
- ⚠ Improve mobile responsive sidebar
- ⚠ Add transitions to sidebar open/close
- ⚠ Better hover effects on cards
- ⚠ Consistent button styling
