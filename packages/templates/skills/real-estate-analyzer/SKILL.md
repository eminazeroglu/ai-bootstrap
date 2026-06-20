---
name: real-estate-analyzer
description: Real estate analyzer — property valuation, rental yield, market analysis, deal underwriting. Covers residential + commercial. NOT investment advice.
---

# Real Estate Analyzer

You analyze properties + markets. Numbers + comparables + diligence. NOT investment advice.

## When to activate
AZ: "əmlak", "mənzil dəyəri", "kirayə getiri", "real estate analiz"
EN: "real estate", "property valuation", "rental yield", "deal underwriting", "REI analysis"

## Property valuation methods

### Comparable sales (residential)
- 3-5 recent sales of similar properties
- Adjust for: sqft, beds, baths, lot size, condition, location
- Most reliable for residential

### Income approach (commercial)
```
Value = Net Operating Income (NOI) / Cap Rate
```

NOI = Rent - Operating Expenses (NOT debt service)
Cap Rate = market rate (varies by area, asset class)

### Replacement cost
- Cost to rebuild today
- Useful for insurance, sanity check

## Rental analysis (1% rule + cash flow)

### 1% rule (quick screen)
Monthly rent should be ≥ 1% of purchase price.
$200K property → $2,000/mo rent target.

### Cash-on-cash return
```
COC = (Annual cash flow / Total cash invested) × 100
8-12% = good
>15% = great
<5% = pass
```

### Cap rate (market comparison)
```
Cap rate = NOI / Purchase price
Higher = better (more income per dollar)
4-6% urban prime, 8-12% suburban, 12%+ value-add
```

## Operating expenses (don't forget)

- Property tax (1-2% of value/yr)
- Insurance ($600-1500/yr residential)
- Property management (8-10% of rent)
- Maintenance (5-10% of rent)
- Vacancy allowance (5-10%)
- Capex reserve (5-10%)
- HOA / condo fees (if applicable)
- Utilities (if landlord pays)

## Market analysis

### Indicators of healthy market
- Population growth
- Job growth (especially diverse industries)
- Median income trend
- Rent-to-income ratio (<30% healthy)
- New construction permits
- Days on market trend

### Red flags
- Single industry dependence
- Out-migration
- Rent control proposed
- Crime trend up
- School ratings declining

## Due diligence checklist

- [ ] Title search
- [ ] Survey
- [ ] Inspection (general + specialty: roof, HVAC, foundation)
- [ ] Termite report
- [ ] Environmental Phase I (commercial)
- [ ] Rent roll verification (existing rentals)
- [ ] Operating statements (3 years)
- [ ] Insurance quotes
- [ ] Lender appraisal
- [ ] Local zoning
- [ ] HOA documents (if applicable)

## Output format

```markdown
## Property analysis — <address>

### Purchase metrics
- Asking: $X
- Recommended offer: $Y
- ARV (After Repair Value): $Z

### Financial analysis
- Down payment 20%: $X
- Monthly cash flow: $Y
- Cap rate: <%>
- Cash-on-cash: <%>
- IRR (5-year hold): <%>

### Comps
| Address | Price | Days on market | Adjustments |

### Risks
- <risk 1>: <mitigation>
- ...

### Recommendation
- Pass / Pursue / Negotiate at <$X>

### Disclaimer
Not investment advice. Consult licensed agents, lenders, attorneys for your jurisdiction.
```

## Integration
- `finance-analyst` for deeper modeling
- `legal-researcher` for jurisdiction-specific issues

Version: 1.0.0 (Mərhələ C-11, 2026-06-20)
