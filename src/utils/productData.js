// Product data - list of all products in public/product folder
// Each product folder contains: image/ and spec/ subfolders

export const products = [
  {
    id: '32e',
    name: '32E',
    imagePath: '/product/32e/image/32e.jpg',
    specPath: '/product/32e/spec/32e_spec.pdf'
  },
  {
    id: '32p',
    name: '32P',
    imagePath: '/product/32p/image/32p.jpg',
    specPath: '/product/32p/spec/32p_spec.pdf'
  },
  {
    id: '53r',
    name: '53R',
    imagePath: '/product/53r/image/ATC-53R_600X600.png',
    specPath: '/product/53r/spec/53r_spec.pdf'
  },
  {
    id: '63e',
    name: '63E',
    imagePath: '/product/63e/image/ATC-63E_600X600.png',
    specPath: '/product/63e/spec/63e_spec.pdf'
  },
  {
    id: 'agx-orin',
    name: 'AGX-ORIN',
    imagePath: '/product/agx-orin/image/AGX-Orin-series_600x600.png',
    specPath: '/product/agx-orin/spec/AIM-Edge heoa V25V01.pdf'
  },
  {
    id: 'aioox',
    name: 'AIOOX',
    imagePath: '/product/aioox/image/Edge-aioox_600x600.png',
    specPath: '/product/aioox/spec/AIM Edge aioox.pdf'
  },
  {
    id: 'edge-pro-1u',
    name: 'EDGE-PRO-1U',
    imagePath: '/product/edge-pro-1u/image/server-1U_1000X1000.png',
    specPath: '/product/edge-pro-1u/spec/edge_pro_1u_spec.pdf'
  },
  {
    id: 'edge-pro-2u',
    name: 'EDGE-PRO-2U',
    imagePath: '/product/edge-pro-2u/image/server-2U_1000X1000.png',
    specPath: '/product/edge-pro-2u/spec/edge_pro_2u_spec.pdf'
  },
  {
    id: 'igx-orin',
    name: 'IGX-ORIN',
    imagePath: '/product/igx-orin/image/IGX-Orin-series_600X600.png',
    specPath: '/product/igx-orin/spec/Inventec Orin IGX 2U.pdf',
    userGuidePath: '/product/igx-orin/userGuide/Inventec-IGX-Orin_Software_Installation-20250812.pdf'
  },
  {
    id: 'm185',
    name: 'M185',
    imagePath: '/product/m185/image/M185_600X600.png',
    specPath: '/product/m185/spec/M185.pdf'
  },
  {
    id: 'm215t',
    name: 'M215T',
    imagePath: '/product/m215t/image/M215T_600X600.png',
    specPath: '/product/m215t/spec/m240-m215_spec.pdf'
  },
  {
    id: 'm240',
    name: 'M240',
    imagePath: '/product/m240/image/M240_600X600.png',
    specPath: '/product/m240/spec/m240-m215_spec.pdf'
  },
  {
    id: 'momi13',
    name: 'MOMI13',
    imagePath: '/product/momi13/image/MOMI13_600X600.png',
    specPath: '/product/momi13/spec/momi13_spec.pdf'
  },
  {
    id: 'ncon',
    name: 'NCON',
    imagePath: '/product/ncon/image/Edge-NCOX_600x600.png',
    specPath: '/product/ncon/spec/AIM-Edge ncon Y23V01.pdf',
    userGuidePath: '/product/ncon/userGuide/AIM-Edge ncox_ncon User Manual V1.3.pdf'
  },
  {
    id: 'ncox',
    name: 'NCOX',
    imagePath: '/product/ncox/image/Edge-NCOX_600x600.png',
    specPath: '/product/ncox/spec/AIM-Edge ncox Y23V01.pdf',
    userGuidePath: '/product/ncox/userGuide/AIM-Edge ncox_ncon User Manual V1.3.pdf'
  },
  {
    id: 'nx-h3003',
    name: 'NX-H3003',
    imagePath: '/product/nx-h3003/image/NX-H3003_600X600.png',
    specPath: '/product/nx-h3003/spec/E200G4.pdf'
  },
  {
    id: 'psox',
    name: 'PSOX',
    imagePath: '/product/psox/image/Edge-psox_600x600.png',
    specPath: '/product/psox/spec/AIM-Edge psox_pson User Manual V1.5.pdf'
  },
  {
    id: 'pson',
    name: 'PSON',
    imagePath: '/product/pson/image/Edge-psox_600x600.png',
    specPath: '/product/pson/spec/AIM-Edge psox_pson User Manual V1.5.pdf'
  },
  {
    id: 'qc01',
    name: 'QC01',
    imagePath: '/product/qc01/image/QC-01_600X600.png',
    specPath: '/product/qc01/spec/qc01_spec.pdf',
    userGuidePath: '/product/qc01/userGuide/QC01W-UserGuide-v1.0.pdf'
  },
  {
    id: 'top1',
    name: 'TOP1',
    imagePath: '/product/top1/image/Edge-top1_600X600.png',
    specPath: '/product/top1/spec/AIM-Edge TOP1 User Manual V1.4.pdf'
  },
  {
    id: 'ucon',
    name: 'UCON',
    imagePath: '/product/ucon/image/Edge-ucon_600X600.png',
    specPath: '/product/ucon/spec/AIM-Edge ucon Y23V03.pdf',
    userGuidePath: '/product/ucon/userGuide/AIM-Edge ucon User Manual V1.10[21].pdf'
  }
]

// Helper function to format product name to uppercase
export const formatProductName = (productId) => {
  return productId.toUpperCase().replace(/-/g, '-')
}
