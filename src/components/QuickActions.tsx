
import React from 'react';
import { Plus, Image, Bookmark, QrCode } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const QuickActions: React.FC = () => {
  const { toast } = useToast();

  const handleQrCodeScan = () => {
    // Check if the browser supports the BarcodeDetector API
    if ('BarcodeDetector' in window) {
      toast({
        title: "Starting QR code scanner",
        description: "Please allow camera access to scan QR codes"
      });
      
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        .then(stream => {
          // Create a video element to display the camera feed
          const video = document.createElement('video');
          document.body.appendChild(video);
          video.srcObject = stream;
          video.setAttribute('playsinline', 'true');
          video.style.position = 'fixed';
          video.style.top = '0';
          video.style.left = '0';
          video.style.width = '100%';
          video.style.height = '100%';
          video.style.objectFit = 'cover';
          video.style.zIndex = '9999';
          video.play();
          
          // Create a close button
          const closeButton = document.createElement('button');
          closeButton.innerText = 'Close Scanner';
          closeButton.style.position = 'fixed';
          closeButton.style.bottom = '20px';
          closeButton.style.left = '50%';
          closeButton.style.transform = 'translateX(-50%)';
          closeButton.style.zIndex = '10000';
          closeButton.style.padding = '10px 20px';
          closeButton.style.backgroundColor = '#4285F4';
          closeButton.style.color = 'white';
          closeButton.style.border = 'none';
          closeButton.style.borderRadius = '20px';
          document.body.appendChild(closeButton);
          
          // Create BarcodeDetector
          const barcodeDetector = new window.BarcodeDetector({ formats: ['qr_code'] });
          
          // Function to clean up elements
          const cleanup = () => {
            if (video.srcObject) {
              const tracks = (video.srcObject as MediaStream).getTracks();
              tracks.forEach(track => track.stop());
            }
            video.remove();
            closeButton.remove();
            clearInterval(scanInterval);
          };
          
          // Detect QR codes periodically
          const scanInterval = setInterval(() => {
            barcodeDetector.detect(video)
              .then(barcodes => {
                if (barcodes.length > 0) {
                  const qrValue = barcodes[0].rawValue;
                  cleanup();
                  toast({
                    title: "QR Code Scanned",
                    description: `Value: ${qrValue}`
                  });
                  
                  // Handle the QR code value (e.g., open URL)
                  if (qrValue.startsWith('http')) {
                    window.open(qrValue, '_blank');
                  }
                }
              })
              .catch(err => {
                console.error("QR Detection error:", err);
              });
          }, 500);
          
          // Close the scanner when the button is clicked
          closeButton.addEventListener('click', () => {
            cleanup();
          });
        })
        .catch(err => {
          toast({
            title: "Camera access denied",
            description: "Please allow camera access to use the QR scanner",
            variant: "destructive"
          });
          console.error("Camera access error:", err);
        });
    } else {
      toast({
        title: "QR Scanner not supported",
        description: "Your browser doesn't support QR code scanning",
        variant: "destructive"
      });
    }
  };

  const handleImageUpload = () => {
    // Create an input element of type file
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.display = 'none';
    document.body.appendChild(fileInput);
    
    // Trigger the file dialog
    fileInput.click();
    
    // Handle the selected file
    fileInput.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        const selectedImage = files[0];
        const imageUrl = URL.createObjectURL(selectedImage);
        
        // Create preview modal
        const modal = document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0,0,0,0.8)';
        modal.style.display = 'flex';
        modal.style.flexDirection = 'column';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        modal.style.zIndex = '9999';
        
        const img = document.createElement('img');
        img.src = imageUrl;
        img.style.maxWidth = '90%';
        img.style.maxHeight = '70%';
        img.style.objectFit = 'contain';
        
        const actions = document.createElement('div');
        actions.style.display = 'flex';
        actions.style.gap = '10px';
        actions.style.marginTop = '20px';
        
        const searchButton = document.createElement('button');
        searchButton.innerText = 'Search with this image';
        searchButton.style.padding = '10px 20px';
        searchButton.style.backgroundColor = '#4285F4';
        searchButton.style.color = 'white';
        searchButton.style.border = 'none';
        searchButton.style.borderRadius = '20px';
        
        const closeButton = document.createElement('button');
        closeButton.innerText = 'Close';
        closeButton.style.padding = '10px 20px';
        closeButton.style.backgroundColor = '#757575';
        closeButton.style.color = 'white';
        closeButton.style.border = 'none';
        closeButton.style.borderRadius = '20px';
        
        actions.appendChild(searchButton);
        actions.appendChild(closeButton);
        
        modal.appendChild(img);
        modal.appendChild(actions);
        document.body.appendChild(modal);
        
        // Handle actions
        searchButton.onclick = () => {
          // Open Google Lens or similar image search
          window.open(`https://lens.google.com/uploadbyurl?url=${encodeURIComponent(imageUrl)}`, '_blank');
          document.body.removeChild(modal);
          URL.revokeObjectURL(imageUrl);
        };
        
        closeButton.onclick = () => {
          document.body.removeChild(modal);
          URL.revokeObjectURL(imageUrl);
        };
      }
      document.body.removeChild(fileInput);
    };
  };

  const actions = [
    { icon: <Plus className="h-5 w-5" />, label: 'Add', onClick: () => {} },
    { icon: <Image className="h-5 w-5" />, label: 'Upload Image', onClick: handleImageUpload },
    { icon: <Bookmark className="h-5 w-5" />, label: 'Bookmarks', onClick: () => {} },
    { icon: <QrCode className="h-5 w-5" />, label: 'Scan QR Code', onClick: handleQrCodeScan },
  ];

  return (
    <div className="flex flex-col items-center mt-8 gap-8">
      <div className="flex justify-center space-x-6">
        {actions.map((action, index) => (
          <div
            key={index}
            className="flex flex-col items-center cursor-pointer"
            onClick={action.onClick}
          >
            <div className="p-4 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors w-12 h-12 flex items-center justify-center mb-2">
              <div className="text-gray-600">{action.icon}</div>
            </div>
            <span className="text-xs text-gray-600">{action.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Extend Window interface for BarcodeDetector
declare global {
  interface Window {
    BarcodeDetector: any;
  }
}

export default QuickActions;
