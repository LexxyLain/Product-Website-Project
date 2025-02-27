document.addEventListener('DOMContentLoaded', function() {
	// Initialize AOS if available
	if (typeof AOS !== 'undefined') {
	  AOS.init({ once: true, mirror: false });
	} else {
	  console.error("AOS is not defined. Please include the AOS script.");
	}
	
	/* SLIDER FUNCTIONALITY */
	let slideIndex = 0;
	const slider = document.getElementById('slider');
	const slides = slider.getElementsByClassName('slide');
	const slideControl = document.getElementById('slide-control');
	const slideControlItems = slideControl.getElementsByClassName('slide-control-item');
  
	// Set smooth transition on slider track
	slider.style.transition = 'transform 0.5s ease-in-out';
  
	function updateSlide() {
	  // Translate slider vertically so the active slide fills the viewport.
	  slider.style.transform = `translateY(-${slideIndex * 100}vh)`;
	  // Update active class on slide control items
	  Array.from(slideControlItems).forEach((item, idx) => {
		item.classList.toggle('active', idx === slideIndex);
	  });
	}
  
	updateSlide();
  
	Array.from(slideControlItems).forEach((item, index) => {
	  item.addEventListener('click', function() {
		if (index !== slideIndex) {
		  slideIndex = index;
		  updateSlide();
		}
	  });
	});
  
	/* MODAL FUNCTIONALITY */
	const modal = document.getElementById('modal');
	const closeBtn = document.getElementById('modal-close');
	closeBtn.addEventListener('click', () => {
	  modal.style.display = 'none';
	});
	const moreImages = document.getElementsByClassName('more-images-item');
	const previewImages = document.getElementsByClassName('img-preview');
	Array.from(moreImages).forEach(el => {
	  el.addEventListener('click', () => {
		const imgs = el.parentNode.getElementsByTagName('img');
		Array.from(imgs).forEach((img, idx) => {
		  if (previewImages[idx]) previewImages[idx].src = img.src;
		});
		const img = el.querySelector('img');
		modal.style.display = 'block';
		document.getElementById('modal-content').src = img.src;
	  });
	});
  
	/* PRODUCT CARD INTERACTIONS */
	const productCards = document.querySelectorAll('.product-card');
	productCards.forEach(card => {
	  card.addEventListener('mouseenter', function() {
		this.style.transform = 'translateY(-10px)';
	  });
	  card.addEventListener('mouseleave', function() {
		this.style.transform = 'translateY(0)';
	  });
	  const viewDetailsBtn = card.querySelector('.view-details');
	  if (viewDetailsBtn) {
		viewDetailsBtn.addEventListener('click', function(e) {
		  e.preventDefault();
		  alert('Product details will be displayed here.');
		});
	  }
	  const addToCartBtn = card.querySelector('.add-to-cart');
	  if (addToCartBtn) {
		addToCartBtn.addEventListener('click', function() {
		  const productName = card.querySelector('.product-name').textContent;
		  const notification = document.createElement('div');
		  notification.className = 'cart-notification';
		  notification.textContent = `${productName} added to cart!`;
		  document.body.appendChild(notification);
		  setTimeout(() => {
			notification.style.opacity = '1';
			notification.style.transform = 'translateY(0)';
		  }, 10);
		  setTimeout(() => {
			notification.style.opacity = '0';
			setTimeout(() => notification.remove(), 300);
		  }, 2000);
		});
	  }
	  const wishlistBtn = card.querySelector('.wishlist');
	  if (wishlistBtn) {
		wishlistBtn.addEventListener('click', function() {
		  this.classList.toggle('active');
		  const icon = this.querySelector('i');
		  if (this.classList.contains('active')) {
			icon.className = 'bx bxs-heart';
			this.style.backgroundColor = '#ffcdd2';
			icon.style.color = '#e53935';
		  } else {
			icon.className = 'bx bx-heart';
			this.style.backgroundColor = '';
			icon.style.color = '';
		  }
		});
	  }
	  
	  // Append cart notification style only once
	  if (!document.getElementById('cart-style')) {
		const cartStyle = document.createElement('style');
		cartStyle.id = 'cart-style';
		cartStyle.textContent = `
		  .cart-notification {
			position: fixed;
			top: 100px;
			right: 20px;
			background-color: #f36100;
			color: white;
			padding: 12px 20px;
			border-radius: 4px;
			box-shadow: 0 4px 8px rgba(0,0,0,0.2);
			z-index: 1001;
			opacity: 0;
			transform: translateY(-20px);
			transition: all 0.3s ease;
		  }
		`;
		document.head.appendChild(cartStyle);
	  }
	});
  });
  