document.addEventListener('DOMContentLoaded', () => {

    // 1. CALCULATOR TABS LOGIC
    const tabs = document.querySelectorAll('.calc-tab');
    const panels = document.querySelectorAll('.calc-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active from all tabs and panels
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));
            
            // Add active to clicked tab and corresponding panel
            tab.classList.add('active');
            const targetId = tab.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });

    // 2. SCROLL TO CALC FUNCTION
    window.scrollToCalc = function(mode) {
        const calcSection = document.getElementById('calculadora');
        calcSection.scrollIntoView({ behavior: 'smooth' });
        
        if(mode === 'construir') {
            document.querySelector('[data-target="calc-construir"]').click();
        } else if (mode === 'negocio') {
            document.querySelector('[data-target="calc-negocio"]').click();
        }
    };

    // 3. CALCULATOR LOGIC - CONSTRUIR
    const cBlocks = document.getElementById('c-blocks');
    const cPrecioCompra = document.getElementById('c-precio-compra');
    const cCostoMat = document.getElementById('c-costo-mat');
    const cMaquina = document.getElementById('c-maquina');
    
    const cResComprar = document.getElementById('c-res-comprar');
    const cResMat = document.getElementById('c-res-mat');
    const cResMaq = document.getElementById('c-res-maq');
    const cResDiff = document.getElementById('c-res-diff');
    const cCtaBtn = document.getElementById('c-cta-btn');

    function formatRD(num) {
        return "RD$" + Math.round(num).toLocaleString('en-US');
    }

    function calcConstruir() {
        const qty = parseFloat(cBlocks.value) || 0;
        const buyPrice = parseFloat(cPrecioCompra.value) || 0;
        const matCost = parseFloat(cCostoMat.value) || 0;
        const maqPrice = parseFloat(cMaquina.value) || 0;

        const costBuy = qty * buyPrice;
        const costMakeMat = qty * matCost;
        const prelimDiff = costBuy - costMakeMat - maqPrice;
        
        cResComprar.textContent = formatRD(costBuy);
        cResMat.textContent = formatRD(costMakeMat);
        cResMaq.textContent = formatRD(maqPrice);
        
        if (prelimDiff > 0) {
            cResDiff.textContent = "+" + formatRD(prelimDiff);
            cResDiff.className = "value txt-green";
        } else {
            cResDiff.textContent = formatRD(prelimDiff);
            cResDiff.className = "value txt-red";
        }

        // Update CTA URL
        const selectedOption = cMaquina.options[cMaquina.selectedIndex].text;
        const maqModel = selectedOption.split(" ")[0];
        cCtaBtn.href = `sergio/?objetivo=construccion&blocks=${qty}&modelo=${maqModel}`;
    }

    [cBlocks, cPrecioCompra, cCostoMat, cMaquina].forEach(input => {
        input.addEventListener('input', calcConstruir);
    });
    calcConstruir(); // Init

    // 4. CALCULATOR LOGIC - NEGOCIO
    const nBlocks = document.getElementById('n-blocks');
    const nPrecioVenta = document.getElementById('n-precio-venta');
    const nCostoMat = document.getElementById('n-costo-mat');

    const nResVentas = document.getElementById('n-res-ventas');
    const nResMat = document.getElementById('n-res-mat');
    const nResMargen = document.getElementById('n-res-margen');
    const nCtaBtn = document.getElementById('n-cta-btn');

    function calcNegocio() {
        const qty = parseFloat(nBlocks.value) || 0;
        const sellPrice = parseFloat(nPrecioVenta.value) || 0;
        const matCost = parseFloat(nCostoMat.value) || 0;

        const sales = qty * sellPrice;
        const matCosts = qty * matCost;
        const grossMargin = sales - matCosts;

        nResVentas.textContent = formatRD(sales);
        nResMat.textContent = formatRD(matCosts);
        nResMargen.textContent = formatRD(grossMargin);

        // Update CTA URL
        nCtaBtn.href = `sergio/?objetivo=negocio&blocks=${qty}`;
    }

    [nBlocks, nPrecioVenta, nCostoMat].forEach(input => {
        input.addEventListener('input', calcNegocio);
    });
    calcNegocio(); // Init

    // 5. FAQ ACCORDION LOGIC
    const accHeaders = document.querySelectorAll('.acc-header');
    
    accHeaders.forEach(header => {
        header.addEventListener('click', function() {
            // Toggle active class on header
            this.classList.toggle('active');
            
            // Toggle panel max-height for animation
            const panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            } 
        });
    });

    // 6. LIGHTBOX LOGIC
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = document.querySelector(".close-lightbox");
    const imgs = document.querySelectorAll('.lightbox-img');

    imgs.forEach(img => {
        img.addEventListener('click', function() {
            lightbox.style.display = "block";
            lightboxImg.src = this.src;
            document.body.style.overflow = 'hidden';
        });
    });

    closeBtn.onclick = function() {
        lightbox.style.display = "none";
        document.body.style.overflow = 'auto';
    }

    window.onclick = function(event) {
        if (event.target == lightbox) {
            lightbox.style.display = "none";
            document.body.style.overflow = 'auto';
        }
    }

    document.addEventListener('keydown', (e) => {
        if(e.key === "Escape" && lightbox.style.display === "block") {
            lightbox.style.display = "none";
            document.body.style.overflow = 'auto';
        }
    });

});
