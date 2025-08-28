# Chapter 3: Products and Services

## 3.1 Platform Ecosystem Overview

OUROBOT operates through a Two-Sided Market model, connecting "Data Contributors" with "Enterprise Customers." The platform's core value streams are as follows:

**Data Flow**: Real videos → Edge-side AI anonymization → High-quality training data

**Value Flow**: Enterprise payments → Platform revenue → User Points → $OURO token incentives

**Trust Flow**: Privacy protection → User trust → Participation growth → Data enrichment

### Deep Learning Recognition Core Technology

| Technology Component | Implementation                          | Performance Metrics                                    |
| -------------------- | --------------------------------------- | ------------------------------------------------------ |
| **Face Detection**   | MediaPipe Face Detection                | Latency < 30ms (iPhone 12), Accuracy > 95%             |
| **Hand Tracking**    | MediaPipe Hands (21-point 3D Landmarks) | Supports multi-hand detection, single-hand error < 5mm |
| **Object Detection** | YOLOv8 Lite                             | 30-60 FPS on-device, mAP@0.5≈37.2% (COCO)              |

All models are quantized and compressed for edge-side inference, ensuring privacy protection and reducing cloud costs.

## 3.2 For Contributors: OUROBOT App

### 3.2.1 Smart Video Recording System

Our App is not just a recording tool, but a smart guide designed to build absolute user trust.

**Real-time Privacy Preview for Peace of Mind**: Before you press the record button, you can see in real-time how your face looks after intelligent blur processing. Your original facial data will never be recorded or uploaded, giving you complete control and security.

**Gamified Guidance for High-Value Videos**: Hand gesture skeletons overlay on the screen, guiding you like a game to keep movements within optimal ranges. AI also provides real-time reminders to clear background clutter, ensuring every second of your contribution earns the highest quality points.

### 3.2.2 Privy Wallet Integration Details

| Process Stage                        | Implementation Details                                                                                                                                                                                 |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Email Wallet Creation**            | User enters email → Privy backend triggers one-time verification code → Complete verification generates ECDSA private key shards in TEE, no mnemonic needed → User completes registration < 60 seconds |
| **Token Reception & Management**     | In-app embedded AssetView component displays $OURO balance, staking status, unlock schedule; supports Mantle network (ERC-20)                                                                          |
| **Identity Verification Advantages** | All video upload APIs require Wallet.signMessage(nonce); signature valid for 60 seconds, prevents replay; failure immediately locks wallet for 30 minutes                                              |
| **Pre-reward Risk Prevention**       | TEE private key isolation → Shard storage → Multi-sig whitelist → Behavioral risk control (AI conditional automated review)                                                                            |

**Seamless Onboarding**: Users log in through familiar email or social accounts (Google, Apple ID), Privy automatically creates a non-custodial wallet in the background, with no need to memorize complex mnemonics.

**Unified Asset Management**: Points earned by users in the app and converted $OURO tokens are clearly displayed in this embedded wallet.

**Progressive Security**: Initial small assets may be protected by Privy's social recovery mechanism. When user assets grow to a certain level, the system guides them to set up higher-level security measures (such as adding hardware wallets).

**Frictionless Interaction**: Users can perform one-click signing for staking, conversion and other operations without handling complex Gas Fees or on-chain confirmation processes.

## 3.3 For Enterprises: OUROBOT Data Platform

### 3.3.1 Service Models

**Real-time Data Streams**: WebSocket + gRPC; configurable gesture types, quality thresholds, language tags

**Batch Data Packages**: Cloud object storage segmented downloads; supports AV1 encoding reducing 40% bandwidth

**Custom Collection Tasks**: Enterprises publish requirements via GraphQL API → System distributes to App → Automatic settlement upon task completion

### 3.3.2 API and Compliance

**Authentication**: OAuth 2.0 + JWT, minimum 15-minute lifespan, supports short-term credential rotation

**Privacy Reports**: Each batch of data includes AnonymizationProof.json, containing facial information entropy metrics and re-identification risk scores (<0.01)

## 3.4 Community Incentives and Gamification System

### 3.4.1 Point System Operation Process

```
Record Video → AI Quality Assessment → Base Points
↓
Scarcity Factor
↓
Level Bonus
↓
Staking Bonus
↓
Total Points
```

**Base Points**: 10-100 points based on video length and completion rate

**Quality Factor**: Model scoring 0.5-3.0x multiplier; low quality (<60) will be rejected

**Scarcity**: System calculates 1.0-5.0x multiplier based on current database scarcity

**Level and Staking Bonuses**: See section 3.4.3

### 3.4.2 Point → Token Conversion

Dynamic conversion rate: **R = (α × S) / (P + ε)**

Where α=0.4, S is platform weekly net income (USDC), P is total Point circulation. Minimum conversion threshold: 1,000 Points; tokens unlock linearly over 30 days after conversion.

### 3.4.3 User Levels and Staking Mechanism

| Level     | Point Threshold | Bonus Multiplier |
| --------- | --------------- | ---------------- |
| 1 Bronze  | 0–1,000         | 1.0×             |
| 2 Silver  | 1,001–5,000     | 1.1×             |
| 3 Gold    | 5,001–15,000    | 1.2×             |
| 4 Diamond | 15,001–50,000   | 1.4×             |

_Staking mechanism and bonuses detailed in section 5.3.2_

### 3.4.4 Platform Profit Token Buyback Cycle

**Buyback Fund Sources**: Enterprise subscriptions, API usage, custom services each contribute 30-50%

**Buyback Schedule**: Fixed monthly date using TWAP method; 50% burned after buyback, 50% injected into staking pool

**Economic Loop**: Token value increase → User staking willingness increases → Quality data increases → Enterprise payments increase → Further increases buyback scale

## Chapter Summary

OUROBOT's products and services system successfully balances the needs of data contributors and enterprise customers through a two-sided market design. The privacy-first technical architecture, gamified incentive system, and enterprise-level service guarantees jointly build a sustainable data ecosystem. Key innovations include: edge-side AI anonymization, dynamic Point incentive mechanisms, multi-tier staking systems, and transparent token economic models.
