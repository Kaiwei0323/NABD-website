/**
 * Local case study pages (content adapted from Inventec NABD case studies).
 */
export const caseStudiesList = [
  {
    slug: 'physical-ai-sensor',
    title: 'From Sensor to Decision: Physical AI Use Cases on the Inventec Edge IGX 2U Atlas Server',
    tag: 'Industrial Edge',
    heroImage: '/image/nabd-case-detail/physical-ai-hero.jpg',
    gridImage: '/image/nabd-case/case-physical-ai-sensor.jpg',
    gridImageWidth: 580,
    gridImageHeight: 480,
    highlights: [
      'Seamless robotics lifecycle: DGX training and Omniverse simulation to deployment with NVIDIA Isaac compatibility.',
      'Certified medical AI: real-time endoscopic assistance while meeting IEC 60601/62304 expectations.',
      'Mission-critical security: autonomous edge intelligence without cloud dependency.',
      'Real-time sensor fusion: LiDAR, radar, thermal via NVIDIA Holoscan.',
      'MIG on IGX Thor for isolated perception, planning, and control pipelines.',
    ],
  },
  {
    slug: 'igx-thor-platform',
    title:
      'Inventec Edge IGX 2U Atlas Server: A Production-Ready Platform for Physical AI Powered by NVIDIA IGX Thor',
    tag: 'NVIDIA IGX',
    heroImage: '/image/nabd-case-detail/igx-thor-hero.jpg',
    gridImage: '/image/nabd-case/case-igx-thor.jpg',
    gridImageWidth: 580,
    gridImageHeight: 480,
    highlights: [
      '2U rack-mountable system for real-time robotics, medical, and security workloads.',
      'NVIDIA IGX Thor / Blackwell—up to 5,581 FP4-Sparse TFLOPs for heavy AI inference.',
      '10-year lifecycle, industrial vibration/thermal ratings, functional safety hardware.',
      '2×200 GbE (ConnectX-7) and BMC for enterprise remote management.',
      'MIG for parallel sensor and AI pipelines without interference.',
    ],
  },
  {
    slug: 'qualcomm-dragonwing',
    title:
      'Inventec Leverages Qualcomm Dragonwing QCS6490 Processor to Transform Edge AI Applications for Customers',
    tag: 'Edge AI',
    heroImage: '/image/nabd-case-detail/qualcomm-hero.jpg',
    gridImage: '/image/nabd-case/case-qualcomm.png',
    gridImageWidth: 380,
    gridImageHeight: 285,
    highlights: [
      'Compact fanless AIM-Edge QC01 with Hexagon NPU.',
      '~33% lower memory use and 5% lower CPU load in railway monitoring benchmark.',
      '~18 ms per frame for real-time video analytics.',
      'Multi-camera inputs and reduced cloud dependency.',
      'Ideal for safety-critical systems such as railway grade-crossing monitoring.',
    ],
  },
  {
    slug: 'partner-hardware',
    title:
      "Accelerating Edge AI Innovation: How Inventec Empowers Customers with Partner's Hardware Technology",
    tag: 'Partners',
    heroImage: '/image/nabd-case-detail/partner-edge-hero.jpg',
    gridImage: '/image/nabd-case/case-partner-hardware.jpg',
    gridImageWidth: 580,
    gridImageHeight: 480,
    highlights: [
      'Collaborative AI ecosystem for traffic and manufacturing edge deployments.',
      'AIM-Edge fanless designs for harsh 24/7 environments.',
      'Up to ~30% traffic flow improvement on Taiwan Provincial Highway 74.',
      'Manufacturing AI: first-pass yield improvements over 27%.',
      '5G/4G/Ethernet and IoT integration options.',
    ],
  },
  {
    slug: 'aoi-manufacturing',
    title:
      'Empowering Smart Manufacturing: The Case for AI-Enabled Automated Optical Inspection (AOI)',
    tag: 'Smart Manufacturing',
    heroImage: '/image/nabd-case-detail/aoi-hero.jpg',
    gridImage: '/image/nabd-case/case-aoi.jpg',
    gridImageWidth: 580,
    gridImageHeight: 480,
    highlights: [
      'AI edge + 5G/Wi-Fi for real-time quality monitoring.',
      'Textile inspection detection rate improved from ~30% to ~90%.',
      'Wheel rim inspection reduces complaints and error costs.',
      'Modular integration with existing AOI and production lines.',
    ],
  },
]

export const caseStudiesBySlug = Object.fromEntries(caseStudiesList.map((c) => [c.slug, c]))

export function getCaseStudyMeta(slug) {
  return caseStudiesBySlug[slug] ?? null
}
