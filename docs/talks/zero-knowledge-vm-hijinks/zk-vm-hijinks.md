---
description: Hushcon Seattle - December 2023
---

# Zero Knowledge VM Hijinks

Presented at Hushcon Seattle 2023, this talk focused on security and privacy implications of ZK Virtual Machines, with particular emphasis on automated bug markets and self-healing software supply chains.

## Highlights

- Explained ZK Virtual Machines: Provers execute arbitrary programs with private inputs/outputs and generate "receipts" proving correct execution; Verifiers confirm legitimacy without knowing private data
- Noted that programs execute slower in zkVMs but provide mathematical certainty of correct execution (with caveats discussed in Part 4)
- Traced ZK evolution through Proofs, Gadgets (Cathie Yun's work), Circuits (CIRCOM), and Virtual Machines (RiscZero, Polygon ZkEVM)
- **Featured Proof of Exploitability prominently**: demonstrating how to prove bugs in software without disclosing exploit details, enabling automated triage and private bug markets
- Explored implications for self-healing software supply chains: combining ZK proofs with automated vulnerability discovery and remediation
- Discussed ZK applications: identity systems, Tornado.cash, Dark Forest's ZK MMO mechanics, ZKML for verifiable AI, blockchain scaling through ZkEVM, and governance with configurable privacy
- Addressed security community concerns about ZK technology potentially enabling ZK ransomware scenarios
- Positioned automated bug markets as a pathway to economically incentivize security improvements across the software ecosystem

## Resources

[View Slides](https://docs.google.com/presentation/d/1VnrdIbo-lE91Dfr2PVkQfHGQzRFrk1arAIzUMhlKHI8/edit#slide=id.p){ target=_blank }
